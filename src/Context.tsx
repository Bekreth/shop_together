import React, { createContext } from "react"

import { ListStorage } from "listStorage"
import { DatabaseManager } from "./listStorage/databaseManager"
import { UserDatabase } from "user"

const userDB = new UserDatabase()
const dbClient = new ListStorage("group_list")
const dbManager = new DatabaseManager()

export const UserContext = createContext(userDB)
export const DatabaseContext = createContext(dbClient)
export const DatabaseManagerContext = createContext(dbManager)

export default function Context(props: {}) {
	return (
		<UserContext.Provider value={userDB}>
			<DatabaseContext.Provider value={dbClient}>
			</DatabaseContext.Provider>
		</UserContext.Provider>
	)
}
