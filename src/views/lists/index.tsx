import React from "react"
import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"

import ListContents from "views/lists/components/ListContents"
import { ListData, ListType, ListStorage } from "database/list"
import { DatabaseManagerContext } from "Context"

//TODO: need a better setup than this
const emptyList: ListData = {
	_id: "",
	name: "",
	type: ListType.SHOPPING,
	created: new Date(),
	updated: new Date(),
	items: {}
}

export default function ShoppingList() {
	const {
		databaseName,
		listName,
	} = useParams()
	const databaseManager = useContext(DatabaseManagerContext)

	const [listStorage, setListStorage] = useState<ListStorage | undefined>(undefined)
	const [focusedList, setFocusedList] = useState<ListData>(emptyList)

	useEffect(() => {
		setListStorage(databaseManager.fetchListStorage(databaseName))
	}, [databaseManager, databaseName])

	useEffect(() => {
		if (listName != undefined && listStorage != undefined) {
			listStorage.getListByName(listName)
				.then(setFocusedList)
				.catch(console.error)
		}
	}, [listStorage, listName])

	// TODO: if db client is undefined, navigate home
	return (
		<>
			{(focusedList !== emptyList && listStorage != undefined) && 
				<ListContents
					focusedList={focusedList}
					listStorage={listStorage}
				/>
			}
		</>
	)
}
