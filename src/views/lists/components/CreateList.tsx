import React from "react"
import { useState } from "react"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Modal from "@mui/material/Modal"
import InputLabel from "@mui/material/InputLabel"
import FormControl from "@mui/material/FormControl"
import MenuItem from "@mui/material/MenuItem"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

import {ListData, makeList} from "listData"

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
	navigate: (newList: string) => void
	appendList: (listData: ListData) => Promise<string>
}

export default function CreateList(props: CreateListProps) {
	const {isOpen, close, navigate, appendList} = props

	const [listName, setListName] = useState("")
	const [serverName, setServerName] = useState("")

	const handleServerSelector = (event: SelectChangeEvent) => {
		setServerName(event.target.value as string)
	}

	const createList = () => {
		appendList(makeList(listName))
			.then(rev => close())
			.catch(error => (
				console.error("failed to insert", error)
			))
		navigate(listName)
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
						<InputLabel id="server_selector_label">Server Name</InputLabel>
						<Select 
							id="serverSelector"
							label="Server Name"
							value={serverName}
							onChange={handleServerSelector}
						>
							<MenuItem value="Server 1">Server 1</MenuItem>
							<MenuItem value="Server 2">Server 2</MenuItem>
						</Select>
					</FormControl>
				</Box>
				<br/>
				<Button
					variant="contained"
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
