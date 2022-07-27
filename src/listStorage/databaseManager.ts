import PouchDB from "pouchdb"

import {
	Database
} from "user"

import {
	ListStorage
} from "./database"

export class DatabaseManager {
	private listDatabase: {[database: string]: ListStorage}

	constructor() {
		this.listDatabase = {}
	}

	addDatabase(database: Database) {
		this.listDatabase[database.databaseName] = new ListStorage(database.databaseName)	
	}

	fetchListStorage(databaseName: string): ListStorage {
		return this.listDatabase[databaseName]
	}

}
