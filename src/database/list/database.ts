import PouchDB from "pouchdb"

import { 
	connectionToString,
	Server,
} from "../user"

import { ListData } from "./types"
import { 
	buildShoppingResolver, 
} from "./resolvers"
import { StorageMetadata } from "utils/pouchTypes"

import { 
	ConflictResolver,
	resolveConflicts
} from "./conflictResolution"
import { 
	designDocPath,
	designDoc,
	getView, 
	View,
} from "./design_docs"

const cleanup_timer = 60_000

export class ListStorage {
	private db: PouchDB.Database
	private shoppingListResolver: ConflictResolver<ListData>
	private watching?: PouchDB.Core.Changes<ListData>

	constructor(databaseName: string, server?: Server) {
		console.log(`Starting new database ${databaseName}`)
		this.db = new PouchDB(databaseName)
		this.db.get(designDocPath)
			.then(() => console.log(`Design doc ${designDocPath} already exists`))
			.catch(() => {
				console.log(`Design doc ${designDocPath} doesnt exists.  Adding it.`)
				this.db.put(designDoc)
			})
		this.shoppingListResolver = buildShoppingResolver(this.db)

		if (server !== undefined) {
			const remote = `${connectionToString(server)}/${databaseName}`
			console.log(`Connecting to ${remote}`)
			const remoteDB = new PouchDB(remote, {
				skip_setup: true,
				auth: {
					username: server.username,
					password: server.password,
				}
			})

			const options = {
				live: true,
				retry: true,
				continuous: true,
				auto_compaction: true
			}

			this.db.sync(remoteDB, options)
			setInterval(() => resolveConflicts(this.shoppingListResolver), cleanup_timer)
		} else {
			console.log(`Database ${databaseName} has no server to attach to`)
		}
	}

	async getListNames(): Promise<string[]> {
		const message = await this.db.query(getView(View.ListNames), {reduce: true})
		const output: string[] = message.rows.map(row => row.value)[0]
		return output ? output : []
	}

	async getListByName(name: string): Promise<ListData> {
		const message = await this.db.query(getView(View.ListByName), {key: name})
		const output: ListData = message.rows[0].value
		return output
	}

	async createList(data: ListData): Promise<string> {
		const putObject = await this.db.put(data)
		return putObject.rev
	}

	async updateList(data: ListData): Promise<ListData> {
		const putObject = await this.db.put(data)
		data._rev = putObject.rev
		return data
	}

	watchList(input: StorageMetadata, setListData: (data: ListData) => void) {
		if (this.watching !== undefined) this.watching.cancel()

		const {_id} = input
		this.watching = this.db.changes<ListData>({
			since: "now",
			live: true,
			include_docs: true,
			doc_ids: [_id],
		}).on("change", (change) => {
			if (change.doc === undefined) return
			setListData(change.doc)
		})
	}
}
