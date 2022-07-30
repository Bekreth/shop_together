import React, { createContext, useEffect } from "react"

import { DatabaseManager } from "./listStorage/databaseManager"
import { ListStorage } from "./listStorage/database"
import { UserDatabase } from "user"

const userDatabase = new UserDatabase()
const databaseManager = new DatabaseManager()

userDatabase.getDatabases()
	.then(dbs => {
		databaseManager.addDatabases(dbs)
	})
	.catch(console.error)

export const UserContext = createContext(userDatabase)
export const DatabaseManagerContext = createContext(databaseManager)

export default function Context(props: {children: React.ReactNode}) {
	const {
		children
	} = props

	return (
		<UserContext.Provider value={userDatabase}>
			<DatabaseManagerContext.Provider value={databaseManager}>
				{children}
			</DatabaseManagerContext.Provider>
		</UserContext.Provider>
	)
}
