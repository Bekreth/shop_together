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
	Server,
	initUser,
} from "user"
import { UserContext } from "index"

export default function Profile() {
	const userDB: UserDatabase = useContext(UserContext)

	const [serverList, setServerList] = useState([
		{
			_id: "some_id",
			serverName: "Base Camp",
			address: "localhost",
			password: "password",
			username: "Billy",
			port: 1234,
			editing: false,
		},
		{
			_id: "some_other_id",
			serverName: "Backup system",
			address: "some.location.com",
			password: "password",
			username: "Billy.J",
			port: 2345,
			editing: false,
		}
	])

	const [databaseList, setDatabaseList] = useState([
		{
			_id: "db 1",
			serverName: "Base Camp",
			name: "OG DB",
			editing: false,
		}
	])

	const databaseInteractions = {
		newDatabase: () => {
			console.log("New database")
		},
		deleteDatabase: (id: string) => {
			console.log("Delete database")
		},
		editDatabase: (id: string) => {
			const updatedList = databaseList.map(database => {
				const output = database
				output.editing = database._id == id
				return output
			})
			setDatabaseList(updatedList)
		},
		confirmEditDatabase: (serverUpdates: Database) => {
			console.log("Confirm database")
		},
		cancelEditDatabase: () => {
			const updatedList = databaseList.map(database => {
				const output = database
				output.editing = false
				return output
			})
			setDatabaseList(updatedList)
		}
	}

	const serverInteractions = {
		newServer: () => {
			const server = {
				_id: uuidv4(),
				serverName: "",
				address: "",
				password: "",
				username: "",
				port: 0,
				editing: true,
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
				output.editing = server._id == id
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
				output.editing = false
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
