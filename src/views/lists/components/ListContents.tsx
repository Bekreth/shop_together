import React from "react"
import {useEffect, useState} from "react"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import Divider from "@mui/material/Divider"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import ListSubheader from "@mui/material/ListSubheader"
import Switch from "@mui/material/Switch"

import { Item, ListData, PurchaseState, ListStorage, Price, PriceUnit } from "database/list"
import CreateItem from "views/lists/components/CreateItem"
import EditItem from "views/lists/components/EditItem"

const emptyItem: Item = {
	_id: "",
	name: "",
	state: PurchaseState.TO_BUY,
	created: new Date(),
	updated: new Date(),
	price: undefined,
}

const priceToString: (price: Price) => string = (price) => {
	if (price.unit !== PriceUnit.NONE) {
		return "$" + price.amount + " per " + price.unit
	} else {
		return "$" + price.amount + ""
	}
}

export interface ListContentsProps {
  focusedList: ListData,
	listStorage: ListStorage,
}

export default function ListContents(props: ListContentsProps) {
	const {
		focusedList,
		listStorage
	} = props

	const [listContents, setListContents] = useState(focusedList)
	const [showPurchased, setShowPurchased] = useState(false)
	const [editable, setEditability] = useState(false)
	const [creatingItem, setCreatingItem] = useState(false)
	const [editingItem, setEditingItem] = useState(emptyItem)

	useEffect(() => setListContents(focusedList), [focusedList])

	useEffect(() => {
		listStorage.watchList(focusedList, setListContents)
	}, [listStorage, focusedList])

	const toggleCart = (list: ListData, itemID: string) => {
		const itemState = list.items[itemID].state 
		if (itemState === PurchaseState.TO_BUY) {
			list.items[itemID].state = PurchaseState.IN_CART
		} else if (itemState === PurchaseState.IN_CART) {
			list.items[itemID].state = PurchaseState.TO_BUY
		}
		list.items[itemID].updated = new Date()
		listStorage.updateList({...list})
			.then(setListContents)
			.catch(console.error)
	}

	const purchaseItems = (list: ListData) => {
		Object.keys(list.items)
			.map(itemKey => list.items[itemKey])
			.map(item => {
				if (item.state === PurchaseState.IN_CART) {
					item.state = PurchaseState.PURCHASED
				}
				item.updated = new Date()
				return item
			})
		listStorage.updateList({...list})
			.then(setListContents)
			.catch(console.error)
	}

	const returnToBuy = (list: ListData, itemID: string) => {
		list.items[itemID].state = PurchaseState.TO_BUY
		list.items[itemID].updated = new Date()
		listStorage.updateList({...list})
			.then(setListContents)
			.catch(console.error)
	}

	const createItemAppender = (list: ListData) => {
		return (item: Item) => {
			list.items[item._id] = item
			listStorage.updateList({...list})
				.then(setListContents)
				.catch(console.error)
		}
	}

	const openItemEditor = (item: Item) => {
		setEditingItem(item)
	}

	const saveItemEdits = (itemID: string, item: Item) => {
		listContents.items[itemID] = item
		listStorage.updateList({...listContents})
			.then(setListContents)
			.catch(console.error)
	}

	const deleteItem = (item: Item) => {
		delete listContents.items[item._id]
		listStorage.updateList({...listContents})
			.then(setListContents)
			.catch(console.error)
	}

	const modifiableItems = {
		list: listContents,
		editingItems: editable,
		toggleItem: toggleCart,
		returnToBuy: returnToBuy,
		openItemEditor: openItemEditor,
		deleteItem: deleteItem
	}

	return (
		<Box>
			<ButtonGroup variant="contained">
				<Button 
					variant={showPurchased ? "contained" : "outlined"}
					onClick={() => setShowPurchased(!showPurchased)}
				>
					Show Purchased Items
				</Button>
				<Button
					variant={editable ? "contained" : "outlined"}
					onClick={() => setEditability(!editable)}
				>
					Edit Items
				</Button>
			</ButtonGroup>
			<br/>
			<br/>
			<Button
				onClick={() => setCreatingItem(true)}
			>
				Add Item
			</Button>
			<Button
				onClick={() => purchaseItems(listContents)}
			>
				Checkout
			</Button>
			<CreateItem
				listName={focusedList.name}
				addItem={createItemAppender(listContents)}
				isOpen={creatingItem}
				close={() => setCreatingItem(false)}
			/>
			<List
				sx={{width: "80%", float: "right"}}
				subheader={<ListSubheader>Item List</ListSubheader>}
			>
				{unpurchasedItems(modifiableItems)}
				<Divider/>
				{showPurchased && purchasedItems(modifiableItems)}
			</List>
			<EditItem 
				item={editingItem}
				saveItemEdits={saveItemEdits}
				isOpen={editingItem !== emptyItem }
				close={() => setEditingItem(emptyItem)}
			/>
		</Box>
	)
}

const unpurchasedItems = (input: {
	list: ListData,
	toggleItem: (list: ListData, itemID: string) => void,
	editingItems: boolean,
	openItemEditor: (item: Item) => void,
	deleteItem: (item: Item) => void
}) => {
	const {list, toggleItem, editingItems, openItemEditor, deleteItem} = input
	return ( 
		<Box>
			{Object.keys(list.items).map(itemKey => list.items[itemKey])
				.filter((item) => (
					item.state !== PurchaseState.PURCHASED
				))
				.sort((item1, item2) => (
					item1.name.localeCompare(item2.name)
				))
				.map((item, index) => (
					<ListItem divider={index % 5 == 4} key={item.name}>
						<ListItemText>
							{item.name}
						</ListItemText>
						{item.price && item.price.amount && 
							<ListItemText>
								{priceToString(item.price)}
							</ListItemText>
						}
						{editingItems &&
							<Box>
								<Button
									variant="outlined"
									onDoubleClick={() => deleteItem(item)}
									color='warning'
								>
									Delete
								</Button>
								<Button
									variant="outlined"
									onClick={() => openItemEditor(item)}
								>
									Edit
								</Button>
							</Box>
						}
						<Switch 
							onChange={() => toggleItem(list, item._id)}
							checked={item.state === PurchaseState.IN_CART}
						/>
					</ListItem>
				))
			}
		</Box>
	)
}

const purchasedItems = (input: {
	list: ListData,
	returnToBuy: (list: ListData, itemID: string) => void,
	editingItems: boolean,
	openItemEditor: (item: Item) => void,
	deleteItem: (item: Item) => void
}) => {
	const {list, returnToBuy, editingItems, openItemEditor, deleteItem} = input

	return (
		<Box>
			<ListSubheader>Already Purchased</ListSubheader>
			{Object.keys(list.items).map(itemKey => list.items[itemKey])
				.filter((item) => (
					item.state === PurchaseState.PURCHASED
				))
				.sort((item1, item2) => (
					item1.name.localeCompare(item2.name)
				))
				.map((item, index) => (
					<ListItem divider={index % 5 == 4} key={item.name}>
						<ListItemText>
							{item.name}
						</ListItemText>
						{item.price && item.price.amount && 
							<ListItemText style={{justifyContent:"left"}}>
								{priceToString(item.price)}
							</ListItemText>
						}
						{editingItems &&
							<Box>
								<Button
									variant="outlined"
									onClick={() => openItemEditor(item)}
								>
									Edit
								</Button>
								<Button
									variant="outlined"
									onClick={() => deleteItem(item)}
									color='warning'
								>
									Delete
								</Button>
							</Box>
						}
						<Button
							onClick={() => returnToBuy(list, item._id)}
						>
							Re-Add to List
						</Button>
					</ListItem>         
				))
			}
		</Box>
	)
}
