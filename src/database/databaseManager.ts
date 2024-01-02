import { Database, Server } from "./user"
import { ListStorage } from "./list"

export class DatabaseManager {
	private listDatabase: Map<string, ListStorage>

	constructor() {
		this.listDatabase = new Map()
	}

	addDatabases(databases: [Database, Server?][]) {
		for (const [database, server] of databases) {
			if (!this.listDatabase.has(database._id)) {
				this.addDatabase(database, server)
			}
		}
	}

	addDatabase(database: Database, server?: Server) {
		this.listDatabase.set(
			database.databaseName, 
			new ListStorage(database.databaseName, server),
		)
	}

	//TODO: Make this an Optional return
	fetchListStorage(databaseName: string | undefined): ListStorage | undefined {
		if (!databaseName) return undefined
		else return this.listDatabase.get(databaseName)
	}
}
