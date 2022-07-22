import React from "react"
import { useContext, useEffect, useState } from "react"
import {v4 as uuidv4} from "uuid"

import Divider from "@mui/material/Divider"

import DatabaseDetails from "views/profile/components/DatabaseDetails"
import ServerDetails from "views/profile/components/ServerDetails"
import NewDatabase from "views/profile/components/NewDatabase"
import NewServer from "views/profile/components/NewServer"
import UserDetails from "views/profile/components/UserDetails"

import { 
	Database, 
	UserDatabase, 
	UserDBType,
	Server,
} from "user"
import { UserContext } from "index"

export default function Profile() {
	const userDB: UserDatabase = useContext(UserContext)

	const [databaseList, setDatabaseList] = useState<Database[]>([])
	const [serverList, setServerList] = useState<Server[]>([])
	const [rerender, setRerender] = useState(0)

	useEffect(() => {
		userDB.getDatabases()
			.then(setDatabaseList)
			.catch(console.error)

		userDB.getServers()
			.then(setServerList)
			.catch(console.error)
	}, [userDB, rerender])

	const databaseInteractions = {
		newDatabase: () => {
			userDB.createDatabase({
				_id: uuidv4(),
				type: UserDBType.DATABASE,
				databaseName: "Unnamed",
			})
				.then(() => setRerender(rerender + 1))
				.catch(console.error)
		},
		deleteDatabase: (id: string) => {
			userDB.deleteDatabase(databaseList.filter(database => database._id == id)[0])
				.then(() => setRerender(rerender + 1))
				.catch(console.error)
		},
		confirmEditDatabase: (database: Database) => {
			userDB.updateDatabase(database)
				.then(() => setRerender(rerender + 1))
				.catch(console.error)
		} 
	}

	const serverInteractions = {
		newServer: () => {
			userDB.createServer({
				_id: uuidv4(),
				type: UserDBType.SERVER,
				serverName: "",
				address: "",
				password: "",
				username: "",
				port: 0,
			})
				.then(() => setRerender(rerender + 1))
				.catch(console.error)
		},
		deleteServer: (id: string) => {
			userDB.deleteServer(serverList.filter(server => server._id == id)[0])
				.then(() => setRerender(rerender + 1))
				.catch(console.error)
		},
		confirmEditServer: (server: Server) => {
			userDB.updateServer(server)
				.then(() => setRerender(rerender + 1))
				.catch(console.error)
		},
	}

	const [renderedServerList, setRenderedServerList] = useState<JSX.Element[]>([])
	const [renderedDatabaseList, setRenderedDatabaseList] = useState<JSX.Element[]>([])

	useEffect(() => {
		const updatedRenderList: JSX.Element[] = serverList.map(server => {
			return <ServerDetails 
				key={server._id}
				{...server}
				{...serverInteractions}
			/>
		})
		setRenderedServerList(updatedRenderList)
	}, [serverList])

	useEffect(() => {
		const updatedRenderList: JSX.Element[] = databaseList.map(database => {
			const serverMapping: {[key: string]: string} = serverList
				.map(server => {
					return {[server._id]: server.serverName}
				})
				.reduce((accumulator, currentValue) => {
					return {
						...accumulator,
						...currentValue
					}
				}, {})
			return <DatabaseDetails
				key={database._id}
				serverMapping={serverMapping}
				{...database}
				{...databaseInteractions}
			/>
		})
		setRenderedDatabaseList(updatedRenderList)
	}, [databaseList])

	return (
		<>
			<UserDetails/>
			<Divider/>
			<NewDatabase newDatabase={databaseInteractions.newDatabase}/>
			{renderedDatabaseList}
			<Divider/>
			<NewServer newServer={serverInteractions.newServer}/>
			{renderedServerList}
		</>
	)
}
