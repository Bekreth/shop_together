import React, { createContext, useState, useEffect } from "react"

import { DatabaseManager, ListStorageID } from "database/databaseManager"
import { UserDatabase, Database } from "database/user"
import { ListStorage } from "database/list"

export const UserContext = createContext(new UserDatabase())
export const DatabaseManagerContext = createContext<{
	listStorageID: ListStorageID[], 
	addDBToManager: (database: Database) => void,
		}>({
			listStorageID: [], 
			addDBToManager: console.log,
		})

export default function Context(props: {children: React.ReactNode}) {
	const {children} = props

	const [userDatabase, setUserDatabase] = useState(new UserDatabase())
	const [listStorageID, setListStorageID] = useState<ListStorageID[]>([])

	const addDBToManager = (database: Database) => {
		if (!listStorageID.find(value => value.dbID == database._id)) {
			setListStorageID([
				...listStorageID,
				{
					dbID: database._id, 
					dbName: database.databaseName,
					storage: new ListStorage(database.databaseName),
				},
			])
		}
	}

	useEffect(() => {
		userDatabase.getZippedDatabaseServers()
			.then(dbs => {
				let update = listStorageID
				for (const [db, server] of dbs) {
					if (!listStorageID.find(value => db._id == value.dbID)) {
						update = [
							...update, 
							{
								dbID: db._id, 
								dbName: db.databaseName,
								storage: new ListStorage(db.databaseName, server),
							},
						]
					}
				}
				setListStorageID(update)
			})
			.catch(console.error)
	}, [])

	return (
		<UserContext.Provider value={userDatabase}>
			<DatabaseManagerContext.Provider value={{listStorageID, addDBToManager}}>
				{children}
			</DatabaseManagerContext.Provider>
		</UserContext.Provider>
	)
}
