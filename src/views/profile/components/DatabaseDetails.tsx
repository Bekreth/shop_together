import React from "react"
import { useState } from "react"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import FormControl from "@mui/material/FormControl"
import Grid from "@mui/material/Grid"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

import { Database } from "user"
import { Editable } from "types"

export interface DatabaseDetailsProps extends Database {
	serverMapping: {[key: string]: string}
	deleteDatabase: (id: string) => void
	confirmEditDatabase: (serverUpdates: Database) => void
}

export default function DatabaseDetails(props: DatabaseDetailsProps) {
	const {
		_id,
		_rev,
		type,
		serverID,
		databaseName,
		serverMapping,
		deleteDatabase,
		confirmEditDatabase,
	} = props

	const [database, setDatabase] = useState<Database & Editable>({
		_id: _id,
		_rev: _rev,
		type: type,
		editing: false,
		databaseName: databaseName,
		serverID: serverID,
	}) 

	const editDatabase = () => {
		setDatabase({
			...database,
			editing: true,
		})
	}

	const confirmEditing = () => {
		confirmEditDatabase(database)
		setDatabase({
			...database,
			editing: false,
		})
	}

	const cancelEditing = () => {
		setDatabase({
			_id: _id,
			_rev: _rev,
			editing: false,
			type: type,
			databaseName: databaseName,
			serverID: serverID,
		})
	}

	const updateDatabaseName = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDatabase({
			...database,
			databaseName: event.target.value,
		})
	}

	const updateServerName = (event: SelectChangeEvent<string>) => {
		setDatabase({
			...database,
			serverID: event.target.value,
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
			<Card color="green">
				<Typography variant="h4" m={2}>
					Database Details
				</Typography>
				<Grid 
					container 
					spacing={2}
					justifyContent="space-evenly"
				>
					<Grid item xs={6}>
						<Typography variant="h6">
							Database Name
						</Typography>
					</Grid>
					<Grid item xs={5}>
						<TextField 
							label="Database Name" 
							disabled={!database.editing}
							variant="outlined"
							value={database.databaseName}
							onChange={updateDatabaseName}
						/>
					</Grid>

					<Grid item xs={6}>
						<Typography variant="h6">
							Server Name
						</Typography>
					</Grid>
					<Grid item xs={5}>
						<FormControl 
							fullWidth
							disabled={!database.editing}
						>
							<InputLabel>Server Name</InputLabel>
							<Select 
								value={database.serverID ? database.serverID : "00000"}
								onChange={updateServerName}
							>
								<MenuItem
									key="00000"
									value="00000"
								>
									No Server
								</MenuItem>
								{Object.entries(serverMapping).map(serverData => {
									return (
										<MenuItem
											key={serverData[0]}
											value={serverData[0]}
										>
											{serverData[1]}
										</MenuItem>
									)
								})}
							</Select>
						</FormControl>
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
						disabled={database.editing}
						onClick={editDatabase}
					>
						Edit
					</Button>
					{database.editing &&
					<ButtonGroup>
						<Button
							variant="outlined"
							onClick={confirmEditing}
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
							onClick={() => deleteDatabase(_id)}
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

