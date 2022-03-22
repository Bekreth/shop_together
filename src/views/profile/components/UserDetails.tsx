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

export default function UserDetails() {
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
						<TextField label="User Name" variant="outlined"/>
					</Grid>

					<Grid item xs={6}>
						<Typography variant="h6">
							Color Scheme
						</Typography>
					</Grid>
					<Grid item xs={5}>
						<FormControl fullWidth>
							<InputLabel>Default</InputLabel>
							<Select>
								<MenuItem>TBD</MenuItem>
								<MenuItem>TBD</MenuItem>
								<MenuItem>TBD</MenuItem>
							</Select>
						</FormControl>
					</Grid>
				</Grid>
			</Card>
		</Box>
	)
}

