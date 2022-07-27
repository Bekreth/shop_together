import React from "react"
import {useState, useEffect, useContext} from "react"

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

import { User, UserDatabase, initUser } from "user"
import { UserContext } from "App"


export default function UserDetails() {
	const userDB: UserDatabase = useContext(UserContext)

	const [updateable, setUpdateable] = useState(false)
	const [userData, setUserData] = useState(initUser)
	const [showPurgePrompt, setShowPurgePrompt] = useState(false)

	useEffect(() => {
		userDB.getUser()
			.then(setUserData)
			.catch(console.error) // TODO: handle error
	}, [])

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
		</>
	)
}

