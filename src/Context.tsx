import React, { createContext } from "react"

import { DatabaseManager } from "database/databaseManager"
import { UserDatabase } from "database/user"

const userDatabase = new UserDatabase()
const databaseManager = new DatabaseManager()

// TODO: this isn't working, come up with a better loader
userDatabase.getZippedDatabaseServers()
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
