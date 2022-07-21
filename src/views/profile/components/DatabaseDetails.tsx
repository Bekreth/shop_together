import React from "react"
import {useState, useEffect, useContext} from "react"

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
	serverList: string[]
	deleteDatabase: (id: string) => void
	confirmEditDatabase: (serverUpdates: Database) => void
}

export default function DatabaseDetails(props: DatabaseDetailsProps) {
	const {
		type,
		_id,
		_rev,
		serverName,
		databaseName,
		serverList,
		deleteDatabase,
		confirmEditDatabase,
	} = props

	const [database, setDatabase] = useState<Database & Editable>({
		_id: _id,
		_rev: _rev,
		type: type,
		editing: true,
		databaseName: databaseName,
		serverName: serverName,
	}) 

	const editDatabase = () => {
		setDatabase({
			...database,
			editing: true,
		})
	}

	const cancelEditing = () => {
		setDatabase({
			_id: _id,
			editing: false,
			type: type,
			databaseName: databaseName,
			serverName: serverName,
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
			serverName: event.target.value,
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
								value={database.serverName ? database.serverName : "No Server"}
								onChange={updateServerName}
							>
								{serverList.map(serverName => {
									return (
										<MenuItem 
											key={serverName} 
											value={serverName}
										>
											{serverName}
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
							onClick={() => confirmEditDatabase(database)}
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

