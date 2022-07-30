import React from "react"
import { useState, useEffect, useContext } from "react"

import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"

import AddIcon from "@mui/icons-material/Add"


export interface NewDatabaseProps {
	newDatabase: () => void
}

export default function NewDatabase(props: NewDatabaseProps) {
	const {
		newDatabase
	} = props

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
			<Card sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}>
				<Typography variant="h3" sx={{paddingBottom: 5}}>
					New Database
				</Typography>
				<IconButton 
					onClick={newDatabase}
					sx={{
						border: "1px solid green"
					}}
				>
					<AddIcon sx={{
						fontSize: 75
					}}/>
				</IconButton>
			</Card>
		</Box>
	)
}


