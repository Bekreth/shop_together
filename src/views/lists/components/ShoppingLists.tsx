import React from "react"
import { useState } from "react"
import { NavigateFunction, useNavigate } from "react-router"

import Box from "@mui/material/Box"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import InboxIcon from "@mui/icons-material/Inbox"
import AddIcon from "@mui/icons-material/Add"
import SettingsIcon from "@mui/icons-material/Settings"
import Divider from "@mui/material/Divider"

import CreateList from "views/lists/components/CreateList"
import { ListData } from "listData"

export interface ShoppingListsProps {
  listNames: string[]
  closeDrawer: () => void
  appendList: (listData: ListData) => Promise<string>
}

export default function ShoppingLists(props: ShoppingListsProps) {
	const {listNames, closeDrawer, appendList} = props
	const navigate = useNavigate()

	const createListNavigate = (newList: string) => {
		navigate(`/lists/${encodeURIComponent(newList)}`)
		closeDrawer()
	}

	return (
		<List>
			{listNames.map(listName => (
				ShoppingList(listName, navigate, closeDrawer)
			))}
			<Divider/>
			{ListActions(appendList, createListNavigate)}
		</List>
	)
}

const ShoppingList = (
	listName: string, 
	navigate: NavigateFunction,
	closeDrawer: () => void
) => {
	return (
		<ListItem 
			button 
			key={listName}
			onClick={() => {
				const base = encodeURIComponent(listName)
				navigate(`/lists/${base}`)
				closeDrawer()
			}}
		>
			<ListItemIcon>
				<InboxIcon/>
			</ListItemIcon>
			<ListItemText primary={listName}/>
		</ListItem>
	)
}

const ListActions = (
	appendList: (listData: ListData) => Promise<string>,
	navigate: (listName: string) => void
) => {
	const createList = "Create List"
	const editList = "Edit List"
	const [isCreatingList, setCreatingList] = useState(false)

	return (
		<Box>
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
			<ListItem button key={editList}>
				<ListItemIcon>
					<SettingsIcon/>
				</ListItemIcon>
				<ListItemText primary={editList}/>
			</ListItem>
			<CreateList 
				isOpen={isCreatingList} 
				close={() => setCreatingList(false)}
				navigate={navigate}
				appendList={appendList}
			/>
		</Box>
	)
}
