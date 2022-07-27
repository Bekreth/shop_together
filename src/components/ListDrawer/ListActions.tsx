import React from "react"
import { useState, useEffect, useContext } from "react"

import AddIcon from "@mui/icons-material/Add"
import InboxIcon from "@mui/icons-material/Inbox"
import SettingsIcon from "@mui/icons-material/Settings"

import ListItem from "@mui/material/ListItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"

import CreateList from "./CreateList"

const createList = "Create List"
const editList = "Edit List"

export default function ListActions() {

	const [isCreatingList, setCreatingList] = useState(false)

	return (
		<>
			<ListItem
				button
				onClick={() => setCreatingList(true)}
				key={createList}
			>
				<ListItemIcon>
					<AddIcon/>
				</ListItemIcon>
				<ListItemText primary={createList}/>
			</ListItem>
			<ListItem>
				<ListItemIcon>
					<SettingsIcon/>
				</ListItemIcon>
				<ListItemText primary={editList}/>
			</ListItem>
			<CreateList
				isOpen={isCreatingList}
				close={() => setCreatingList(false)}
				navigate={(newList) => console.log(newList)}
			/>
		</>
	)
}

