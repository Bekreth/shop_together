import React from "react"
import {useState, useEffect, useContext} from "react"

import Box from "@mui/material/Box"
import ButtonGroup from "@mui/material/ButtonGroup"
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
	Editable
} from "types"
import { 
	User, 
	UserDatabase, 
	initUser,
	Server
} from "user"


export interface ServerDetailsProps extends Server {
	deleteServer: (id: string) => void
	confirmEditServer: (serverUpdates: Server) => void
}

export default function ServerDetails(props: ServerDetailsProps) {
	const {
		type,
		_id,
		serverName,
		address,
		password,
		username,
		port,
		deleteServer,
		confirmEditServer,
	} = props

	const [server, setServer] = useState<Server & Editable>({
		_id: _id,
		type: type,
		editing: true,
		serverName: serverName,
		address: address,
		password: password,
		username: username,
		port: port
	}) 

	const editServer = () => {
		setServer({
			...server,
			editing: true
		})
	}

	const cancelEditing = () => {
		setServer({
			_id: _id,
			type: type,
			editing: false,
			serverName: serverName,
			address: address,
			password: password,
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

	const updatePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
		setServer({
			...server,
			password: event.target.value,
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
							disabled={!server.editing}
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
							disabled={!server.editing}
							variant="outlined"
							value={server.address}
							onChange={updateAddress}
						/>
					</Grid>

					<Grid item xs={6}>
						<Typography variant="h6">
							Password
						</Typography>
					</Grid>
					<Grid item xs={5}>
						<TextField 
							label="Password" 
							disabled={!server.editing}
							variant="outlined"
							type="password"
							value={server.password}
							onChange={updatePassword}
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
							disabled={!server.editing}
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
							disabled={!server.editing}
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
						disabled={server.editing}
						onClick={editServer}
					>
						Edit
					</Button>
					{server.editing &&
					<ButtonGroup>
						<Button
							variant="outlined"
							onClick={() => confirmEditServer(server)}
						>
							Confirm
						</Button>
						<Button
							variant="outlined"
							color="error"
							onClick={cancelEditing}
						>
							Cancel
						</Button>
						<Button
							variant="contained"
							color="error"
							onClick={() => deleteServer(_id)}
						>
							Delete
						</Button>
					</ButtonGroup>
					}
				</CardActions>
			</Card>
		</Box>
	)
}

