import { StorageMetadata } from "listData"

type LookupToResolution<T extends StorageMetadata> = (lookups: ConflictLookup[]) => Promise<ConflictResolution<T>>[]
type PromiseReducer<T extends StorageMetadata> = (previous: Promise<ConflictResolution<T>>, current: Promise<ConflictResolution<T>>) => Promise<ConflictResolution<T>>
type MetadataExpander<T extends StorageMetadata> = (resolution: Promise<ConflictResolution<T>>) => Promise<StorageMetadata[]> 
export type ResolverFunction<T extends StorageMetadata> = (previous: T, current: T) => T

export interface ConflictEntry {
  id: string
  key: string
  value: string[]
}

export interface ConflictLookup {
  _id: string
  _rev: string
  currentHead: string
}

export interface ConflictResolution<T extends StorageMetadata> {
  resolvedData: T
  headRevision: string
  deadendRevisions: string[]
}

export interface ConflictResolver<T extends StorageMetadata> {
  findConflicts: () => Promise<ConflictEntry[]>
  findDocument: (lookup: ConflictLookup) => Promise<T>
  resolveConflicts: ResolverFunction<T>
  sinkBulkMessage: (bulkMessage: Promise<StorageMetadata[]>) => void
}

export function resolveConflicts<T extends StorageMetadata>(resolver: ConflictResolver<T>) {
  const lookupsToResolutions = buildLookupsToResolutions(resolver)
  const reducer = buildPromiseReducer(resolver)
  const bulkMessage = buildBulkWrite(resolver)

  resolver.findConflicts()
    .then(entries => {
      entries.map(buildLookups)
        .map(lookupsToResolutions)
        .map(resolutions => resolutions.reduceRight(reducer))
        .map(bulkMessage)
        .forEach(resolver.sinkBulkMessage)
    })
}

function buildLookups(entry: ConflictEntry): ConflictLookup[] {
  return [...entry.value].map(rev => {
    return {
      _id: entry.id,
      _rev: rev,
      currentHead: entry.key
    }
  })
}

function buildLookupsToResolutions<T extends StorageMetadata>(
  resolver: ConflictResolver<T>
): LookupToResolution<T> {
  return (lookups: ConflictLookup[]) => {
    return lookups.map(lookup => {
      return resolver.findDocument(lookup)
        .then(doc => {
          const output: ConflictResolution<T> = {
            resolvedData: doc as T,
            headRevision: lookup.currentHead,
            deadendRevisions: (lookup.currentHead !== lookup._rev) ? [lookup._rev] : []
          }
          return output
        })
    })
  }
}

function buildPromiseReducer<T extends StorageMetadata>(resolver: ConflictResolver<T>): PromiseReducer<T> {
  return (previous, current) => {
    return new Promise<ConflictResolution<T>>((resolve, reject) => {
      previous.then(previousList => {
        current.then(currentList => {
          resolve({
            resolvedData: resolver.resolveConflicts(
              previousList.resolvedData, 
              currentList.resolvedData
            ),
            headRevision: previousList.headRevision,
            deadendRevisions: [
              ...previousList.deadendRevisions,
              ...currentList.deadendRevisions,
            ]
          })
        })
        .catch(reject)
      })
      .catch(reject)
    })
  }
}

function buildBulkWrite<T extends StorageMetadata>(resolver: ConflictResolver<T>): MetadataExpander<T> {
  return (fullResolution: Promise<ConflictResolution<T>>) => {
    return fullResolution.then(resolved => {
      return [resolved.resolvedData,
        ...resolved.deadendRevisions.map(deadRev => {
          return {
            _id: resolved.resolvedData._id,
            _rev: deadRev,
            _deleted: true
          }
        })
      ]
    })
  }
}
