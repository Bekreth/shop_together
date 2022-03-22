import PouchDB from "pouchdb"

export class UserDatabase {
	private db: PouchDB.Database
	
	constructor(username: string) {
		console.log("Starting user database")
		this.db = new PouchDB(username)
	}
}
