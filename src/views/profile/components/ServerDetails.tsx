import React from "react"
import {useState, useEffect, useContext} from "react"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import FormControl from "@mui/material/FormControl"
import Grid from "@mui/material/Grid"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

import { 
	User, 
	UserDatabase, 
	initUser,
	Server
} from "user"
import { UserContext } from "index"

export interface ServerDetailsProps extends Server {
	editing: boolean,
	editServer: (id: string) => void
	confirmEditServer: (serverUpdates: Server) => void
	cancelEditServer: () => void
}

export default function ServerDetails(props: ServerDetailsProps) {
	const {
		_id,
		serverName,
		address,
		username,
		port,
		editing,
		editServer,
		confirmEditServer,
		cancelEditServer
	} = props

	const [server, setServer] = useState({
		_id: _id,
		serverName: serverName,
		address: address,
		username: username,
		port: port
	}) 

	const cancelEditing = () => {
		cancelEditServer()
		setServer({
			_id: _id,
			serverName: serverName,
			address: address,
			username: username,
			port: port
		})
	}

	const updateServerName = (event: React.ChangeEvent<HTMLInputElement>) => {
		setServer({
			...server,
			serverName: event.target.value,
		})
	}

	const updateAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
		setServer({
			...server,
			address: event.target.value,
		})
	}

	const updateUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
		setServer({
			...server,
			username: event.target.value,
		})
	}

	const updatePort = (event: React.ChangeEvent<HTMLInputElement>) => {
		setServer({
			...server,
			port: +event.target.value,
		})
	}

	return (
		<Box
			sx={{
				display: "flex",
				flexWrap: "wrap",
				"& > :not(style)": {
					m: 1, 
					width: 512,
					height: 512
				}
			}}
		>
			<Card>
				<Typography variant="h4" m={2}>
					Server Details
				</Typography>
				<Grid 
					container 
					spacing={2}
					justifyContent="space-evenly"
				>
					<Grid item xs={6}>
						<Typography variant="h6">
							Server Name
						</Typography>
					</Grid>
					<Grid item xs={5}>
						<TextField 
							label="Server Name" 
							disabled={!editing}
							variant="outlined"
							value={server.serverName}
							onChange={updateServerName}
						/>
					</Grid>

					<Grid item xs={6}>
						<Typography variant="h6">
							Address
						</Typography>
					</Grid>
					<Grid item xs={5}>
						<TextField 
							label="Address" 
							disabled={!editing}
							variant="outlined"
							value={server.address}
							onChange={updateAddress}
						/>
					</Grid>

					<Grid item xs={6}>
						<Typography variant="h6">
							User Name
						</Typography>
					</Grid>
					<Grid item xs={5}>
						<TextField 
							label="User Name" 
							disabled={!editing}
							variant="outlined"
							value={server.username}
							onChange={updateUsername}
						/>
					</Grid>

					<Grid item xs={6}>
						<Typography variant="h6">
							Port
						</Typography>
					</Grid>
					<Grid item xs={5}>
						<TextField 
							label="Port" 
							disabled={!editing}
							variant="outlined"
							value={server.port}
							onChange={updatePort}
						/>
					</Grid>
				</Grid>
				<CardActions
					sx={{
						display: "flexbox",
						alignItems: "flex-end",
						flexDirection: "column"
					}}
				>
					<Button
						variant="contained"
						onClick={() => editServer(_id)}
					>
						Edit
					</Button>
					{editing && 
					<Button
						variant="outlined"
						color="error"
						onClick={cancelEditing}
					>
						Cancel
					</Button>
					}
					{editing && 
					<Button
						variant="outlined"
						onClick={() => confirmEditServer(server)}
					>
						Confirm
					</Button>
					}
				</CardActions>
			</Card>
		</Box>
	)
}

