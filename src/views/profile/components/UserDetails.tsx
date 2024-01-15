import React from "react"
import { useState, useEffect, useContext } from "react"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import FormControl from "@mui/material/FormControl"
import Grid from "@mui/material/Grid"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

import { UserDatabase, initUser, Connection } from "database/user"
import { UserContext } from "Context"
import GridConnectionInfo from "components/GridConnectionInfo"


export default function UserDetails() {
	const userDB: UserDatabase = useContext(UserContext)

	const [updateable, setUpdateable] = useState(false)
	const [userData, setUserData] = useState(initUser)
	const [showPurgePrompt, setShowPurgePrompt] = useState(false)
	const [showSavePrompt, setShowSavePrompt] = useState(false)
	const [showLoadPrompt, setShowLoadPrompt] = useState(false)

	useEffect(() => {
		userDB.getUser()
			.then(setUserData)
			.catch(console.error) // TODO: handle error
	}, [])

	const saveToRemote = (server: Connection, remote_id: string) => {
		userDB.saveToRemote(server, remote_id)
		setShowSavePrompt(false)
	}

	const loadFromRemote = (server: Connection, remote_id: string) => {
		userDB.loadFromRemote(server, remote_id)
		setShowLoadPrompt(false)
	}

	const updateUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUserData({
			...userData,
			username: event.target.value,
		})
		setUpdateable(true)
	}

	const updateUserDatabase = () => {
		userDB.updateUser(userData)
			.then(setUserData)
			.catch(console.error)
		setUpdateable(false)
	}

	const purgeUserDatabase = () => {
		userDB.purgeUserDatabase()
		userDB.getUser()
			.then(setUserData)
			.catch(console.error) // TODO: handle error
		setShowPurgePrompt(false)
	}

	return (
		<>
			<Button
				variant="contained"
				onClick={() => setShowLoadPrompt(true)}
			>
				Load from Remote
			</Button>
			<Button
				variant="contained"
				onClick={() => setShowSavePrompt(true)}
			>
				Backup to Remote
			</Button>
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
						User Details
					</Typography>
					<Grid 
						container 
						spacing={2}
						justifyContent="space-evenly"
					>
						<Grid item xs={6}>
							<Typography variant="h6">
								User Name
							</Typography>
						</Grid>
						<Grid item xs={5}>
							<TextField 
								label="User Name" 
								variant="outlined"
								value={userData.username}
								onChange={updateUsername}
							/>
						</Grid>

						<Grid item xs={6}>
							<Typography variant="h6">
								Color Scheme
							</Typography>
						</Grid>
						<Grid item xs={5}>
							<FormControl fullWidth>
								<InputLabel>Color Scheme</InputLabel>
								<Select label="Color Scheme">
									<MenuItem>TBD</MenuItem>
									<MenuItem>TBD</MenuItem>
									<MenuItem>TBD</MenuItem>
								</Select>
							</FormControl>
						</Grid>

					</Grid>
					<CardActions 
						sx={{
							display: "flexbox",
							alignItems: "flex-end",
							flexDirection: "column",
						}}
					>
						<Button
							variant="contained"
							disabled={!updateable}
							onClick={updateUserDatabase}
						>
							Update
						</Button>					
						<Button
							variant="outlined"
							onClick={() => setShowPurgePrompt(true)}
							color="error"
						>
							Purge
						</Button>
					</CardActions>
				</Card>
			</Box>
			{PurgeDialog({showPurgePrompt, setShowPurgePrompt, purgeUserDatabase})}
			{LoadUserProfile({showLoadPrompt, setShowLoadPrompt, loadFromRemote})}
			{SaveUserProfile({showSavePrompt, setShowSavePrompt, saveToRemote})}
		</>
	)
}

function PurgeDialog(props: {
	showPurgePrompt: boolean, 
	setShowPurgePrompt: (showPrompt: boolean) => void,
	purgeUserDatabase: () => void,
}) {
	const {showPurgePrompt, setShowPurgePrompt, purgeUserDatabase} = props
	return (
		<Dialog open={showPurgePrompt} onClose={() => setShowPurgePrompt(false)}>
			<DialogTitle>Dangerous Database Actions</DialogTitle>
			<Grid 
				container 
				spacing={2}
				justifyContent="space-evenly"
			>
				<Grid item xs={6}>
					<Typography>
						Delete User Database
					</Typography>
				</Grid>
				<Grid item xs={5} >
					<Button 
						onClick={purgeUserDatabase}
						variant="outlined"
						color="error"
					>
						DELETE
					</Button>
				</Grid>
			</Grid>
			
		</Dialog>
	)
}

function SaveUserProfile(props: {
	showSavePrompt: boolean, 
	setShowSavePrompt: (showPrompt: boolean) => void,
	saveToRemote: (connection: Connection, databaseName: string) => void
}) {
	const {showSavePrompt, setShowSavePrompt, saveToRemote} = props

	return (
		<Dialog open={showSavePrompt} onClose={() => setShowSavePrompt(false)}>
			<DialogTitle>
				Provide login credentials for where your user profile is saved
			</DialogTitle>
			{GridConnectionInfo({
				handleConnection: saveToRemote, 
				submitButtonName: "Save to Database",
			})}
		</Dialog>
	)
}

function LoadUserProfile(props: {
	showLoadPrompt: boolean, 
	setShowLoadPrompt: (showPrompt: boolean) => void,
	loadFromRemote: (connection: Connection, databaseName: string) => void
}) {
	const {showLoadPrompt, setShowLoadPrompt, loadFromRemote} = props
	return (
		<Dialog open={showLoadPrompt} onClose={() => setShowLoadPrompt(false)}>
			<DialogTitle>
				Provide login credentials for where your user profile is saved
			</DialogTitle>
			{GridConnectionInfo({
				handleConnection: loadFromRemote,
				submitButtonName: "Load From Database",
			})}
		</Dialog>
	)
}
