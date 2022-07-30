import { Database } from "user"
import { ListStorage } from "./database"

export class DatabaseManager {
	private listDatabase: {[database: string]: ListStorage}

	constructor() {
		this.listDatabase = {}
	}

	addDatabases(databases: Database[]) {
		for (const database of databases) {
			if (this.listDatabase[database._id] == undefined) {
				this.addDatabase(database)
			}
		}
	}

	addDatabase(database: Database) {
		this.listDatabase[database.databaseName] = new ListStorage(database.databaseName)
	}

	//TODO: Make this an Optional return
	fetchListStorage(databaseName: string): ListStorage {
		return this.listDatabase[databaseName]
	}
}
