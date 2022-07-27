import React from "react"
import { useState } from "react"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import InputLabel from "@mui/material/InputLabel"
import FormControl from "@mui/material/FormControl"
import Modal from "@mui/material/Modal"
import MenuItem from "@mui/material/MenuItem"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

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
}

export default function CreateList(props: CreateListProps) {
	const {
		isOpen,
		close,
		navigate,
	} = props

	const [listName, setListName] = useState("")

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
							if (event.code === "Enter") console.log("submit")//createList()
						}}
						autoFocus
					/>
					{/*
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
					*/}
				</Box>
				<br/>
				<Button
					variant="contained"
					//onClick={createList} TODO:
					onClick={() => console.log("Clicked to make")}
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
