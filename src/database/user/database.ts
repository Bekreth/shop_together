import PouchDB  from "pouchdb"

import { 
	designDocPath,
	designDoc,
	getView,
	View,
} from "./design_docs"
import { 
	Database,
	User,
	UserDBType,
	Server,
	userID,
	userDB,
} from "./types"

export class UserDatabase {
	private db: PouchDB.Database
	
	constructor() {
		console.log("Starting user database")
		this.db = new PouchDB(userDB)
		this.instantiateDatabase()
	}

	private instantiateDatabase() {
		this.db.get(designDocPath)
			.then(success => console.log(`Design doc ${designDocPath} already exists`))
			.catch(err => {
				console.log(`Design doc ${designDocPath} doesn't exist. Adding it.`)
				this.db.put(designDoc)
					.then(success => console.log(`Design doc ${designDocPath} added`))
					.catch(err2 => console.error(`Failed to put design doc ${designDocPath}:${err2}`))
			})
		this.getUser()
	}

	purgeUserDatabase() {
		this.db.destroy()
		this.db = new PouchDB(userDB)
		this.instantiateDatabase()
	}

	// User
	async getUser(): Promise<User> {
		try {
			return await this.db.get<User>(userID)
		} catch {
			return this.updateUser({
				type: UserDBType.USER,
				_id: userID,
				username: "unknown",
			})
		}
	}

	async updateUser(user: User): Promise<User> {
		const putObject = await this.db.put(user)
		user._rev = putObject.rev
		return user
	}

	// Databases
	async createDatabase(database: Database): Promise<string> {
		const putObject = await this.db.put(database)
		return putObject.rev
	}

	async updateDatabase(database: Database): Promise<Database> {
		const putObject = await this.db.put(database)
		database._rev = putObject.rev
		return database
	}

	async getDatabaseByName(databaseName: string): Promise<Database> {
		const message = await this.db.query(getView(View.DatabaseName), {key: databaseName})
		const output: Database = message.rows[0].value
		return output
	}

	async getDatabases(): Promise<Database[]> {
		const message = await this.db.query(getView(View.DocType), {key: UserDBType.DATABASE})
		if (message.rows.length > 0) {
			const output: Database[] = message.rows[0].value
			return output
		} else {
			return []
		}
	}

	async deleteDatabase(database: Database): Promise<PouchDB.Core.Response> {
		if (database._rev) {
			return await this.db.remove(database._id, database._rev)
		}
		return new Promise((_, reject) => reject(`No rev found in ${database._id}`))
	}

	// Servers
	async createServer(server: Server): Promise<string> {
		const putObject = await this.db.put(server)
		return putObject.rev
	}

	async updateServer(server: Server): Promise<Server> {
		const putObject = await this.db.put(server)
		server._rev = putObject.rev
		return server
	}

	async getServers(): Promise<Server[]> {
		const message = await this.db.query(getView(View.DocType), {key: UserDBType.SERVER})
		if (message.rows.length > 0) {
			const output: Server[] = message.rows.map(row => row.value)[0]
			return output
		} else {
			return []
		}
	}

	async getServerNames(): Promise<string[]> {
		const message = await this.db.query(getView(View.ServerName), {reduce: true})
		const output: string[] = message.rows.map(row => row.value)[0]
		return output
	}

	async deleteServer(server: Server): Promise<PouchDB.Core.Response> {
		if (server._rev) {
			return await this.db.remove(server._id, server._rev)
		}
		return new Promise((_, reject) => reject(`No rev found in ${server._id}`))
	}

}
