import PouchDB from "pouchdb"

import { doc_type } from "user/design_docs"

import { 
	User,
	user_id,
} from "user"

const userDB = "user_data"

export class UserDatabase {
	private db: PouchDB.Database
	private user: User
	
	constructor() {
		console.log("Starting user database")
		this.db = new PouchDB(userDB)
		this.user = this.getUser()
	}

	getUser(): User {
		let output: User = {
			_id: user_id,
			_rev: "",
			modify_date: new Date(),
			username: "unknown",
		}
		this.db.get<User>(user_id)
			.then((doc) => output = doc)
			.catch((_) => {
				this.db.put({
					_id: output._id,
					modify_date: output.modify_date,
					username: output.username,
				})
					.then((response) => output._rev = response.rev)
					.catch((err) => console.log("Failed to create user: ", err))
			})

		return output
	}

}
