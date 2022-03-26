import PouchDB from "pouchdb"

import { ListData } from "listData"
import { ConflictLookup, ConflictResolver } from "./conflictResolution"
import { shoppingListResolver } from "./conflictResolution/shoppingList"

import { StorageMetadata } from "utils/pouchTypes"

export function buildShoppingResolver(db: PouchDB.Database): ConflictResolver<ListData> {
	return {
		findConflicts: () => db.query("list_views.json/conflictingLists")
			.then(message => message.rows),
		findDocument: (lookup: ConflictLookup) => db.get(lookup._id, {rev: lookup._rev}),
		resolveConflicts: shoppingListResolver,
		sinkBulkMessage: (bulkMessage: Promise<StorageMetadata[]>) => bulkMessage.then(db.bulkDocs)
	}
}
