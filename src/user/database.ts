import PouchDB from "pouchdb"

import { 
	docType,
	docTypeID,
} from "./design_docs"

import { 
	User,
	Server,
	userID,
	userDB,
} from "user"

export class UserDatabase {
	private db: PouchDB.Database
	
	constructor() {
		console.log("Starting user database")
		this.instantiateDatabase()
		this.db = new PouchDB(userDB)
	}

	private instantiateDatabase() {
		this.db = new PouchDB(userDB)
		this.db.get(docTypeID)
			.then(doc => console.log("get doc: ", doc))
			.catch(err => {
				// TODO:
				//this.db.put(docType)
				//	.then(doc => console.log("doc: ", doc))
				//	.catch(err => console.log("err: ", err))
			})
		this.getUser()
	}

	purgeUserDatabase() {
		this.db.destroy()
		this.db = new PouchDB(userDB)
		this.getUser()
	}

	async getUser(): Promise<User> {
		try {
			return await this.db.get<User>(userID)
		} catch {
			return this.updateUser({
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

	//async getServers(): Promise<Server> {
	//	await this.db.query(get_view)
	//}


}
