import React from "react"
import {useState, useEffect, useContext} from "react"
import {useNavigate} from "react-router"

import AppBar from "@mui/material/AppBar"
import Button from "@mui/material/Button"
import Drawer from "@mui/material/Drawer"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import PersonIcon from "@mui/icons-material/Person"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"

import {DatabaseContext} from "index"
import { ListData, ListType } from "listData"
import ShoppingLists from "views/lists/components/ShoppingLists"


//TODO: need a better setup than this
const emptyList: ListData = {
	_id: "",
	name: "",
	type: ListType.SHOPPING,
	created: new Date(),
	updated: new Date(),
	items: {}
}

const emptyListNames: string[] = []

export default function HeadBar() {
	const navigate = useNavigate()

	const dbClient = useContext(DatabaseContext)

	const [isOpen, setOpen] = useState(false)
	const [availableLists, setAvailableLists] = useState(emptyListNames)

	useEffect(() => {
		dbClient.getListNames()
			.then(setAvailableLists)
			.catch(console.error)
	}, [dbClient, isOpen])

	const listAppender: (listData: ListData) => Promise<string> = (listData: ListData) => {
		return dbClient.createList(listData)
			.then(rev => {
				availableLists.push(listData.name)
				setAvailableLists([ ...availableLists ])
				return rev
			})
	}

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
					<Button variant="text" 
						onClick={() => navigate("/home")}
						sx={{ flexGrow: 1 }}
						disableRipple
					>
						<Typography variant="h6" component="div">
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
			{isOpen && 
				<Drawer
					anchor="left"
					open={isOpen}
					onClose={closeDrawer}
				>
					<ShoppingLists 
						listNames={availableLists}
						closeDrawer={closeDrawer}
						appendList={listAppender}
					/>
				</Drawer>
			}
		</>
	)
}
