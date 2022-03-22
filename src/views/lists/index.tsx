import React from "react"
import {useState, useEffect, useContext} from "react"
import { useNavigate } from "react-router"
import {useParams} from "react-router-dom"

import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import PersonIcon from "@mui/icons-material/Person"

import ListContents from "views/lists/components/ListContents"
import ShoppingLists from "views/lists/components/ShoppingLists"
import { ListData, ListType } from "listData"
import { DatabaseContext } from "index"

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

export default function Lists() {
	const {listName} = useParams()
	const navigate = useNavigate()

	const dbClient = useContext(DatabaseContext)

	const [isOpen, setOpen] = useState(false)
	const [availableLists, setAvailableLists] = useState(emptyListNames)
	const [focusedList, setFocusedList] = useState(emptyList)

	useEffect(() => {
		dbClient.getListNames()
			.then(setAvailableLists)
			.catch(console.error)
	}, [dbClient, isOpen])

	useEffect(() => {
		const filteredListName = availableLists.filter(name => name === listName)
		if (filteredListName.length === 0) {
			navigate("/lists")
		}
		if (filteredListName.length === 1 && filteredListName[0] !== "") {
			dbClient.getListByName(filteredListName[0])
				.then(setFocusedList)
				.catch(console.error)
		}
	}, [dbClient, listName, availableLists])

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
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Shop Together
					</Typography>
					{listName !== "" &&
						<Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
							{listName}
						</Typography>
					}
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
			{focusedList !== emptyList && 
				<ListContents
					focusedList={focusedList}
				/>
			}
		</>
	)
}
