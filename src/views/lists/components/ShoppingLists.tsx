import React from "react"
import { useContext, useEffect, useState } from "react"
import { NavigateFunction, useNavigate } from "react-router"

import Accordion from "@mui/material/Accordion"
import AccordionDetails from "@mui/material/AccordionDetails"
import AccordionSummary from "@mui/material/AccordionSummary"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"

import AddIcon from "@mui/icons-material/Add"
import InboxIcon from "@mui/icons-material/Inbox"
import SettingsIcon from "@mui/icons-material/Settings"

import CreateList from "views/lists/components/CreateList"
import { ListData } from "listData"
import { Database } from "user"

export interface ShoppingListsProps {
	databaseList: Database[]
  listNames: string[]
  closeDrawer: () => void
  appendList: (listData: ListData) => Promise<string>
}

export default function ShoppingLists(props: ShoppingListsProps) {
	const {
		databaseList,
		listNames, 
		closeDrawer, 
		appendList,
	} = props
	const navigate = useNavigate()

	const [renderedDatabaseList, setRenderedDatabaseList] = useState<JSX.Element[]>([])
	useEffect(() => {
		const updatedRenderList: JSX.Element[] = databaseList.map(database => {
			return <DatabaseContainer key={database._id} database={database}/>
		})
		setRenderedDatabaseList(updatedRenderList)
	}, [databaseList])

	const createListNavigate = (newList: string) => {
		navigate(`/lists/${encodeURIComponent(newList)}`)
		closeDrawer()
	}

	return (
		<List>
			{renderedDatabaseList}
			{/*listNames.map(listName => (
				ShoppingList(listName, navigate, closeDrawer)
			))*/}
			<Divider/>
			{ListActions(appendList, createListNavigate)}
		</List>
	)
}

const DatabaseContainer = (props: {
	database: Database
}) => {
	const {database} = props
	const [expanded, setExpanded] = useState(true)
	return (
		<Accordion 
			expanded={expanded}
			onClick={() => setExpanded(!expanded)}
		>
			<AccordionSummary>
				{database.databaseName}
			</AccordionSummary>
			<AccordionDetails>
				<List>
					<ListItem>List 1</ListItem>
					<ListItem>List 2</ListItem>
					<ListItem>List 3</ListItem>
					<ListItem>List 4</ListItem>
				</List>
			</AccordionDetails>
		</Accordion>
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
