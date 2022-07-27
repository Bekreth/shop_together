import React from "react"
import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"

import ListContents from "views/lists/components/ListContents"
import { ListData, ListType } from "listData"
//import { DatabaseContext } from "App"

//TODO: need a better setup than this
const emptyList: ListData = {
	_id: "",
	name: "",
	type: ListType.SHOPPING,
	created: new Date(),
	updated: new Date(),
	items: {}
}

export default function Lists() {
	const {listName} = useParams()

	//const dbClient = useContext(DatabaseContext)

	const [focusedList, setFocusedList] = useState<ListData>(emptyList)

	/*
	useEffect(() => {
		if (listName != undefined) {
			dbClient.getListByName(listName)
				.then(setFocusedList)
				.catch(console.error)
		}
	}, [dbClient, listName])
	*/

	return (
		<>
			{focusedList !== emptyList && 
				<></>
				/*
				<ListContents
					focusedList={focusedList}
				/>
				*/
			}
		</>
	)
}
