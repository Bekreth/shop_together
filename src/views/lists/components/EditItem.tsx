import React from "react"
import { useState, useEffect } from "react"
import { TextField } from "@mui/material"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import Typography from "@mui/material/Typography"
import Select, { SelectChangeEvent }from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import { Button } from "@mui/material"
import CurrencyInput from "react-currency-input-field"

import { Item, Price, PriceUnit } from "database/list"

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

const emptyPrice: Price = {
	amount: undefined,
	unit: PriceUnit.NONE,
}

export interface EditItemProps {
  item: Item
  saveItemEdits: (itemID: string, item: Item) => void
  isOpen: boolean
  close: () => void
}

export default function EditItem(props: EditItemProps) {
	const {item, saveItemEdits, isOpen, close} = props

	const [itemName, setItemName] = useState(item.name)
	const [itemPrice, setItemPrice] = useState<Price>(item.price ? item.price : emptyPrice)

	useEffect(() => {
		setItemName(item.name)
		setItemPrice(item.price ? item.price : emptyPrice)
	},[item])

	return (
		<Modal
			open={isOpen}
			onClose={close} 
		>
			<Box sx={style}>
				<Typography id="modal-modal-title" variant="h5">
					Editing Item : {itemName}
				</Typography>
				<br/>
				<TextField
					id="itemName"
					label="Item Name"
					variant="outlined"
					defaultValue={item.name}
					onChange={event => setItemName(event.target.value)}
				/>
				<br/>
				<CurrencyInput
					id="itemCost2"
					name="itemCostName"
					prefix="$"
					defaultValue={item.price ? item.price.amount : undefined}
					allowNegativeValue={false}
					placeholder="Item Cost"
					decimalsLimit={2}
					onValueChange={(value, name, values) => {
						if (values) {
							setItemPrice({
								...itemPrice,
								amount: values.float ? values.float : undefined,
							})
						}
					}}
				/>
				<Typography>per</Typography>
				<Select 
					label="per unit" 
					defaultValue={item.price ? item.price.unit : PriceUnit.NONE}
					onChange={(event: SelectChangeEvent<PriceUnit>) => {
						setItemPrice({
							...itemPrice,
							unit: event.target.value as unknown as PriceUnit,
						})
					}}
				>
					<MenuItem value={PriceUnit.NONE}>{PriceUnit.NONE}</MenuItem>
					<MenuItem value={PriceUnit.BOX}>{PriceUnit.BOX}</MenuItem>
					<MenuItem value={PriceUnit.GRAMS_100}>{PriceUnit.GRAMS_100}</MenuItem>
					<MenuItem value={PriceUnit.LITER}>{PriceUnit.LITER}</MenuItem>
					<MenuItem value={PriceUnit.POUND}>{PriceUnit.POUND}</MenuItem>
				</Select>
				<br/>
				<Button
					variant="contained"
					onClick={() => {
						const newItem: Item = {
							...item,
							price: itemPrice === emptyPrice ? undefined : itemPrice,
							name: itemName,
							created: item.created,
							updated: new Date(),
						}
						saveItemEdits(item._id, newItem)
						close()
					}}
				>
					Update Item
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
