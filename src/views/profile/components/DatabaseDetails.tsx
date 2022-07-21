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

import {
	Database
} from "user"

export interface DatabaseDetailsProps extends Database {
	editing: boolean
	serverList: string[]
	deleteDatabase: (id: string) => void
	editDatabase: (id: string) => void
	confirmEditDatabase: (serverUpdates: Database) => void
	cancelEditDatabase: () => void
}

export default function DatabaseDetails(props: DatabaseDetailsProps) {
	const {
		_fileType,
		_id,
		serverName,
		name,
		editing,
		serverList,
		deleteDatabase,
		editDatabase,
		confirmEditDatabase,
		cancelEditDatabase,
	} = props

	const [database, setDatabase] = useState({
		_fileType: _fileType,
		_id: _id,
		name: name,
		serverName: serverName,
	}) 

	const cancelEditing = () => {
		cancelEditDatabase()
		setDatabase({
			_fileType: _fileType,
			_id: _id,
			name: name,
			serverName: serverName,
		})
	}

	const updateDatabaseName = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDatabase({
			...database,
			name: event.target.value,
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
							disabled={!editing}
							variant="outlined"
							value={database.name}
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
							disabled={!editing}
						>
							<InputLabel>Server Name</InputLabel>
							<Select 
								value={database.serverName}
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
						disabled={editing}
						onClick={() => editDatabase(_id)}
					>
						Edit
					</Button>
					{editing &&
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

