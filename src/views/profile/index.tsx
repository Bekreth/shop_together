import React from "react"
import {useState, useEffect, useContext} from "react"

import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"

import DatabaseDetails from "views/profile/components/DatabaseDetails"
import ServerDetails from "views/profile/components/ServerDetails"
import UserDetails from "views/profile/components/UserDetails"

import { 
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
			username: "Billy",
			port: 1234,
			editing: false,
		},
		{
			_id: "some_other_id",
			serverName: "Backup system",
			address: "some.location.com",
			username: "Billy.J",
			port: 2345,
			editing: false,
		}
	])

	const serverInteractions = {
		editServer: (id: string) => {
			const updatedList = serverList.map(server => {
				const output = server
				output.editing = server._id == id
				return output
			})
			setServerList(updatedList)
		},
		confirmEditServer: (serverUpdates: Server) => {
			console.log("confirming")
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


	return (
		<>
			<AppBar position="static" sx={{ flexGrow: 1}}>
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Shop Together
					</Typography>
				</Toolbar>
			</AppBar>
			<UserDetails/>
			{serverList.map(server => ServerDetails({...server, ...serverInteractions}))}
			<DatabaseDetails/>
		</>
	)
}
