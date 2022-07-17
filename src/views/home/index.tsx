import React from "react"

import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Divider from "@mui/material/Divider"
import PersonIcon from "@mui/icons-material/Person"
import Typography from "@mui/material/Typography"


export default function Home() {
	return (
		<Box sx={{
			display: "flex",
			justifyContent: "center",
		}}>
			<Card sx={{
				display: "flex",
				justifyContent: "center",
				minWidth: 400,
				maxWidth: 600,
			}}>
				<CardContent>
					<Typography variant="h4" sx={{display: "flex", justifyContent: "center"}}>
						Welcome to Shop Together
					</Typography>
					<br/>
					<Divider/>
					<br/>
					<Typography variant="body1">
						Shop Together is a simple web app that allows you to share shopping list
						with friends, family, and roommates while being able to fully own all your
						data and deside who and how to distribute it to.
					</Typography>
				</CardContent>
			</Card>
		</Box>
	)
}
