import React from "react"
import { useState } from "react"

import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import { Button } from "@mui/material"

import { Item, makeItem } from "database/list"

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

export interface CreateItemProps {
  listName: string
  addItem: (item: Item) => void
  isOpen: boolean
  close: () => void
}

export default function CreateItem(props: CreateItemProps) {
	const {listName, addItem, isOpen, close} = props
	const [itemName, setItemName] = useState("")

	const createItem = () => {
		if (itemName !== "") {
			const newItem = makeItem(itemName)
			addItem(newItem)
		}
		close()
	}

	return (
		<Modal
			open={isOpen}
			onClose={close}
		>
			<Box sx={style}>
				<Typography id="modal-modal-title" variant="h5">
					New Item
				</Typography>
				<Typography id="modal-modal-title" variant="h6">
					Adding to : {listName}
				</Typography>
				<TextField
					id="itemName" 
					label="Item Name"
					variant="outlined"
					onChange={event => {
						setItemName(event.target.value)
					}}
					onKeyDown={event => {
						if (event.code === "Enter") createItem()
					}}
					autoFocus
				/>
				<br/>
				<Button
					variant="contained"
					onClick={createItem}
				>
					Add To List
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
