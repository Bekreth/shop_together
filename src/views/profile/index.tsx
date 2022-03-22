import React from "react"
import {useState, useEffect, useContext} from "react"

import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"

import DatabaseDetails from "views/profile/components/DatabaseDetails"
import ServerDetails from "views/profile/components/ServerDetails"
import UserDetails from "views/profile/components/UserDetails"

export default function Profile() {
	return (
		<>
			<AppBar position="static" sx={{ flexGrow: 1}}>
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Shop Together
					</Typography>
				</Toolbar>
			</AppBar>
			<UserDetails/>
			<ServerDetails/>
			<DatabaseDetails/>
		</>
	)
}
