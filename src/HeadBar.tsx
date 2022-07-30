import React from "react"
import { useState } from "react"
import { useNavigate } from "react-router"

import AppBar from "@mui/material/AppBar"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import PersonIcon from "@mui/icons-material/Person"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"

import ListDrawer from "components/ListDrawer"

export default function HeadBar() {
	const navigate = useNavigate()

	const [isOpen, setOpen] = useState(false)

	const toggleDrawer = () => {
		setOpen(!isOpen)
	}

	const closeDrawer = () => {
		setOpen(false)
	}

	return (
		<>
			<AppBar position="static" sx={{ flexGrow: 1 }}>
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
						onClick={toggleDrawer}
					>
						<MenuIcon />
					</IconButton>
					<Button 
						variant="text" 
						onClick={() => navigate("/home")}
						sx={{ flexGrow: 1 }}
						disableRipple
					>
						<Typography variant="h6" component="div" sx={{ color: "white" }}>
							Shop Together
						</Typography>
					</Button>
					<IconButton
						size="large"
						color="inherit"
						sx={{ mr: 2 }}
						onClick={() => navigate("/profile")}
					>
						<PersonIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
			<ListDrawer
				isOpen={isOpen}
				closeDrawer={closeDrawer}
			/>
		</>
	)
}
