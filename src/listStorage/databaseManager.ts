import PouchDB from "pouchdb"

import { Database } from "user"

import { ListStorage } from "./database"

export class DatabaseManager {
	private listDatabase: {[database: string]: ListStorage}

	constructor() {
		console.log("bingo")
		this.listDatabase = {}
	}

	addDatabases(databases: Database[]) {
		console.log("here")
		console.log(this)
		console.log("here")
		for (const database of databases) {
			if (this.listDatabase[database._id] == undefined) {
				this.addDatabase(database)
			}
		}
	}

	addDatabase(database: Database) {
		console.log("TODO, db manager")
		//this.listDatabase[database._id] = new ListStorage(database.databaseName)
	}

	fetchListStorage(databaseName: string): ListStorage {
		return this.listDatabase[databaseName]
	}
}
