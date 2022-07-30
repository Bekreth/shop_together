import React from "react"
import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"

import ListContents from "views/lists/components/ListContents"
import { ListData, ListType } from "listData"
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
	console.log("landed in ", databaseName, listName)


	const dbClient = useContext(DatabaseManagerContext)
		.fetchListStorage(databaseName ? databaseName : "")

	const [focusedList, setFocusedList] = useState<ListData>(emptyList)

	useEffect(() => {
		if (listName != undefined) {
			dbClient.getListByName(listName)
				.then(setFocusedList)
				.catch(console.error)
		}
	}, [dbClient, listName])


	// TODO: if db client is undefined, navigate home
	return (
		<>
			{focusedList !== emptyList && 
				<ListContents
					focusedList={focusedList}
					dbClient={dbClient}
				/>
			}
		</>
	)
}
