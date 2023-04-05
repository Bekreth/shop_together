import { Database } from "./user"
import { ListStorage } from "./list"

export class DatabaseManager {
	private listDatabase: Map<string, ListStorage>

	constructor() {
		this.listDatabase = new Map()
	}

	addDatabases(databases: Database[]) {
		for (const database of databases) {
			if (!this.listDatabase.has(database._id)) {
				this.addDatabase(database)
			}
		}
	}

	addDatabase(database: Database) {
		this.listDatabase.set(database.databaseName, new ListStorage(database.databaseName))
	}

	//TODO: Make this an Optional return
	fetchListStorage(databaseName: string | undefined): ListStorage | undefined {
		if (!databaseName) return undefined
		else return this.listDatabase.get(databaseName)
	}
}
