import React from "react"
import {useState, useEffect, useContext} from "react"

import AppBar from "@mui/material/AppBar"
import Divider from "@mui/material/Divider"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"

import DatabaseDetails from "views/profile/components/DatabaseDetails"
import ServerDetails from "views/profile/components/ServerDetails"
import NewDatabase from "views/profile/components/NewDatabase"
import NewServer from "views/profile/components/NewServer"
import UserDetails from "views/profile/components/UserDetails"

import {v4 as uuidv4} from "uuid"

import { 
	Database, 
	User, 
	UserDatabase, 
	UserDBType,
	Server,
	initUser,
} from "user"
import { UserContext } from "index"

const noServer = "No Server"

export default function Profile() {
	const userDB: UserDatabase = useContext(UserContext)

	const [databaseList, setDatabaseList] = useState<Database[]>([])
	const [rerender, setRerender] = useState(0)

	useEffect(() => {
		userDB.getDatabases()
			.then(setDatabaseList)
			.catch(console.error)
	}, [userDB, rerender])

	const [serverList, setServerList] = useState<Server[]>([
		{
			type: UserDBType.SERVER,
			_id: "some_id",
			serverName: "Base Camp",
			address: "localhost",
			password: "password",
			username: "Billy",
			port: 1234,
		},
		{
			type: UserDBType.SERVER,
			_id: "some_other_id",
			serverName: "Backup system",
			address: "some.location.com",
			password: "password",
			username: "Billy.J",
			port: 2345,
		}
	])

	const databaseInteractions = {
		newDatabase: () => {
			userDB.createDatabase({
				_id: uuidv4(),
				type: UserDBType.DATABASE,
				databaseName: "Unnamed",
			})
				.then(success => setRerender(rerender + 1))
				.catch(console.error)
		},
		deleteDatabase: (id: string) => {
			userDB.deleteDatabase(databaseList.filter(database => database._id == id)[0])
				.then(success => setRerender(rerender + 1))
				.catch(console.error)
		},
		confirmEditDatabase: (database: Database) => {
			console.log("confirming! ", database)
			userDB.updateDatabase(database)
				.then(success => setRerender(rerender + 1))
				.catch(console.error)
		} 
	}

	const serverInteractions = {
		newServer: () => {
			const server: Server = {
				type: UserDBType.SERVER,
				_id: uuidv4(),
				serverName: "",
				address: "",
				password: "",
				username: "",
				port: 0,
			}
			const updatedList = [server, ...serverList]
			setServerList(updatedList)
		},
		deleteServer: (id: string) => {
			const updatedList = serverList.filter(server => server._id != id)
			setServerList(updatedList)
		},
		editServer: (id: string) => {
			const updatedList = serverList.map(server => {
				const output = server
				//output.editing = server._id == id TODO
				return output
			})
			setServerList(updatedList)
		},
		confirmEditServer: (serverUpdates: Server) => {
			const updatedList = serverList.map(server => {
				return server._id != serverUpdates._id ? 
					server : 
					{
						...server,
						...serverUpdates,
						editing: false,
					}
			})
			setServerList(updatedList)
		},
		cancelEditServer: () => {
			const updatedList = serverList.map(server => {
				const output = server
				//output.editing = false TODO
				return output
			})
			setServerList(updatedList)
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
			return <DatabaseDetails
				key={database._id}
				serverList={[noServer, ...serverList.map(server => server.serverName)]}
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
