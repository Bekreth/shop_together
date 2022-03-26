import PouchDB from "pouchdb"

import { doc_type } from "user/design_docs"

import { 
	User,
	user_id,
} from "user"

const userDB = "user_data"

export class UserDatabase {
	private db: PouchDB.Database
	
	constructor() {
		console.log("Starting user database")
		this.db = new PouchDB(userDB)
		this.getUser()
	}

	purgeUserDatabase() {
		console.log("Purging and rebuilding database")
		this.db.destroy()
		this.db = new PouchDB(userDB)
		this.getUser()
	}

	async getUser(): Promise<User> {
		try {
			return await this.db.get<User>(user_id)
		} catch {
			return this.updateUser({
				_id: user_id,
				username: "unknown",
			})
		}
	}

	async updateUser(user: User): Promise<User> {
		console.log("before", user)
		const putObject = await this.db.put(user)
		user._rev = putObject.rev
		console.log("after", user)
		return user
	}


}
