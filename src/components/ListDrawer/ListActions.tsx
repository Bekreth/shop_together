import React from "react"
import { useState } from "react"
import { useNavigate } from "react-router"

import AddIcon from "@mui/icons-material/Add"
import SettingsIcon from "@mui/icons-material/Settings"

import ListItem from "@mui/material/ListItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"

import CreateList from "./CreateList"

const createList = "Create List"

export default function ListActions() {
	const navigate = useNavigate()

	const [isCreatingList, setCreatingList] = useState(false)

	const navigateToList = (databaseName: string, listName: string) => {
		navigate(`/database/${databaseName}/list/${listName}`)
	}

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
			<CreateList
				isOpen={isCreatingList}
				close={() => setCreatingList(false)}
				navigate={navigateToList}
			/>
		</>
	)
}

