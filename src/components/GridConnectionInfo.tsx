import React from "react"
import { useState } from "react"

import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import Radio from "@mui/material/Radio"
import FormControlLabel from "@mui/material/FormControlLabel"

import { Connection } from "database/user"

export default function GridConnectionInfo(props: {
	handleConnection: (connection: Connection, databaseName: string) => void,
	submitButtonName: string
}) {
	const {
		handleConnection,
		submitButtonName,
	} = props

	const [connection, setConnection] = useState<Connection>({
		scheme: "https",
		address: "",
		password: "",
		username: "",
		port: 0
	})
	const [databaseName, setDatabaseName] = useState<string>("")

	const updateScheme = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value === "http" || event.target.value === "https") {
			setConnection({
				...connection,
				scheme: event.target.value,
			})
		}
	}

	const updateAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
		setConnection({
			...connection,
			address: event.target.value,
		})
	}

	const updateDatabaseName = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDatabaseName(event.target.value)
	}

	const updatePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
		setConnection({
			...connection,
			password: event.target.value,
		})
	}

	const updateUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
		setConnection({
			...connection,
			username: event.target.value,
		})
	}

	const updatePort = (event: React.ChangeEvent<HTMLInputElement>) => {
		setConnection({
			...connection,
			port: +event.target.value,
		})
	}

	return (
		<Grid 
			container 
			spacing={2}
			justifyContent="space-evenly"
		>

			<Grid item xs={6}>
				<Typography variant="h6">
					Scheme
				</Typography>
			</Grid>
			<Grid item xs={5}>
				<FormControlLabel
					label="HTTPS"
					control={
						<Radio 
							checked={connection.scheme === "https"}
							onChange={updateScheme}
							value="https"
						/>
					}
				/>
				<FormControlLabel
					label="HTTP"
					control={
						<Radio 
							checked={connection.scheme === "http"}
							onChange={updateScheme}
							value="http"
						/>
					}
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
					variant="outlined"
					value={connection.address}
					onChange={updateAddress}
				/>
			</Grid>

			<Grid item xs={6}>
				<Typography variant="h6">
					Database Name
				</Typography>
			</Grid>
			<Grid item xs={5}>
				<TextField 
					label="Database Name" 
					variant="outlined"
					value={databaseName}
					onChange={updateDatabaseName}
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
					variant="outlined"
					value={connection.username}
					onChange={updateUsername}
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
					variant="outlined"
					type="password"
					value={connection.password}
					onChange={updatePassword}
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
					variant="outlined"
					value={connection.port}
					onChange={updatePort}
				/>
			</Grid>

			<Grid item xs={6}>
				<Button
					variant="contained"
					onClick={() => handleConnection(connection, databaseName)}
				>
					{submitButtonName}
				</Button>
			</Grid>

		</Grid>
	)
}
