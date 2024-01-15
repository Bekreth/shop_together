import PouchDB  from "pouchdb"

import { 
	designDocPath,
	designDoc,
	getView,
	View,
} from "./design_docs"
import { 
	Connection,
	connectionToString,
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
			.then(() => console.log(`Design doc ${designDocPath} already exists`))
			.catch(() => {
				console.log(`Design doc ${designDocPath} doesn't exist. Adding it.`)
				this.db.put(designDoc)
					.then(() => console.log(`Design doc ${designDocPath} added`))
					.catch(err2 => console.error(`Failed to put design doc ${designDocPath}:${err2}`))
			})
		this.getUser()
	}

	purgeUserDatabase() {
		this.db.destroy()
		this.db = new PouchDB(userDB)
		this.instantiateDatabase()
	}

	private connectToRemote(remote_server: Connection, remote_id: string): PouchDB.Database {
		const scheme = "http"
		const source = `${connectionToString(remote_server)}/${remote_id}`
		return new PouchDB(source, {
			skip_setup: true,
			auth: {
				username: remote_server.username,
				password: remote_server.password,
			}
		})
	}

	loadFromRemote(remote_server: Connection, remote_id: string) {
		this.db.replicate.from(this.connectToRemote(remote_server, remote_id))
	}

	saveToRemote(remote_server: Connection, remote_id: string) {
		this.db.replicate.to(this.connectToRemote(remote_server, remote_id))
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

	// Joint
	async getZippedDatabaseServers(): Promise<[Database, Server?][]> {
		return this.getDatabases().then(databases => {
			const promises: Promise<[Database, Server?]>[] = databases.map(database => {
				if (database.serverID) {
					return this.db.get<Server>(database.serverID)
						.then(server => [database, server])
				} else {
					return new Promise<[Database, undefined]>((resolve, _) => resolve([database, undefined]))
				}
			})
			return Promise.all(promises)
		})
	}
}
