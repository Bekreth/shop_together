import React from "react"
import {useState, useEffect, useContext} from "react"

import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import FormControl from "@mui/material/FormControl"
import Grid from "@mui/material/Grid"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"


export default function ServerDetails() {
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
						<TextField label="Server Name" variant="outlined"/>
					</Grid>

					<Grid item xs={6}>
						<Typography variant="h6">
							Address
						</Typography>
					</Grid>
					<Grid item xs={5}>
						<TextField label="Address" variant="outlined"/>
					</Grid>

					<Grid item xs={6}>
						<Typography variant="h6">
							User Name
						</Typography>
					</Grid>
					<Grid item xs={5}>
						<TextField label="User Name" variant="outlined"/>
					</Grid>
				</Grid>
			</Card>
		</Box>
	)
}

