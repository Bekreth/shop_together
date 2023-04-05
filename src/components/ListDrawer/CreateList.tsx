import React from "react"
import { useContext, useEffect, useState } from "react"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import InputLabel from "@mui/material/InputLabel"
import FormControl from "@mui/material/FormControl"
import Modal from "@mui/material/Modal"
import MenuItem from "@mui/material/MenuItem"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

import { UserContext, DatabaseManagerContext } from "Context"
import { makeList } from "database/list"

const style = {
	position: "absolute" as const,
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
}

export interface CreateListProps {
	isOpen: boolean
	close: () => void
	navigate: (databaseName: string, listName: string) => void
}

export default function CreateList(props: CreateListProps) {
	const {
		isOpen,
		close,
		navigate,
	} = props

	const databaseManager = useContext(DatabaseManagerContext)
	const dbClient = useContext(UserContext)
	const [databaseSelectors, setDatabaseSelectors] = useState<JSX.Element[]>([])

	useEffect(() => {
		dbClient.getDatabases()
			.then(databases => {
				const renderedElements: JSX.Element[] = databases.map(database => {
					const dbName = database.databaseName
					return (
						<MenuItem 
							key={dbName}
							value={dbName}
						>
							{dbName}
						</MenuItem>
					)
				})
				setDatabaseSelectors(renderedElements)
			})
			.catch(console.error)
	}, [dbClient])

	const [listName, setListName] = useState("")
	const [databaseName, setDatabaseName] = useState("")
	const updateDatabaseName = (event: SelectChangeEvent<string>) => {
		setDatabaseName(event.target.value)
	}

	const createList = () => {
		const listStorage = databaseManager.fetchListStorage(databaseName)
		if (!listStorage) return
		listStorage
			.createList(makeList(listName))
			.then(_ => {
				close()
				navigate(databaseName, listName)
			})
			.catch(console.error)
	}

	return (
		<Modal
			open={isOpen}
			onClose={close}
		>
			<Box sx={style}>
				<Typography id="modal-modal-title" variant="h4">
					New List
				</Typography>
				<Box sx={{
					display: "flex",
					justifyContent: "space-between",
				}}>
					<TextField
						id="listName" 
						label="List Name"
						variant="outlined"
						onChange={event => {
							setListName(event.target.value)
						}}
						onKeyDown={event => {
							if (event.code === "Enter") createList()
						}}
						autoFocus
					/>
					<FormControl sx={{minWidth: 140}}>
						<InputLabel id="databse_selector_label">Database Name</InputLabel>
						<Select 
							id="server_selector"
							label="Server Name"
							value={databaseName}
							onChange={updateDatabaseName}
						>
							{databaseSelectors}
						</Select>
					</FormControl>
				</Box>
				<br/>
				<Button
					variant="contained"
					disabled={listName == "" || databaseName == ""}
					onClick={createList}
				>
					Create
				</Button>
				<Button
					variant="outlined"
					onClick={close}
				>
					Cancel
				</Button>
			</Box>
		</Modal>
	)
}
