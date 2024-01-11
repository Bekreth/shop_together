import React from "react"
import { useState, useEffect, useContext } from "react"

import Divider from "@mui/material/Divider"
import Drawer from "@mui/material/Drawer"
import List from "@mui/material/List"

import { DatabaseManagerContext, UserContext } from "Context"
import { Database } from "database/user"

import DatabaseContainer from "./DatabaseContainer"
import ListActions from "./ListActions"

export interface ListDrawerProps {
	isOpen: boolean,
	closeDrawer: () => void
}

export default function ListDrawer(props: ListDrawerProps) {
	const {
		isOpen,
		closeDrawer
	} = props

	const userDatabase = useContext(UserContext)
	const {listStorageID} = useContext(DatabaseManagerContext)

	const [databaseList, setDatabaseList] = useState<Database[]>([])

	useEffect(() => {
		userDatabase.getDatabases()
			.then(setDatabaseList)
			.catch(console.error)
	}, [userDatabase])

	const [renderedDatabaseList, setRenderedDatabaseList] = useState<JSX.Element[]>([])

	useEffect(() => {
		const updatedRenderList: JSX.Element[] = []
		databaseList.forEach(database => {
			const possibleListStorage = listStorageID.find(value => value.dbID === database._id)
			if (!possibleListStorage) return
			possibleListStorage
				.storage
				.getListNames()
				.then(lists => {
					updatedRenderList.push(
						<DatabaseContainer
							key={`database_${database._id}`}
							database={database}
							lists={lists}
							closeDrawer={closeDrawer}
						/>
					)
				})
				.catch(console.error)
		})
		setRenderedDatabaseList(updatedRenderList)
	}, [databaseList, listStorageID])


	return (
		<Drawer
			anchor="left"
			open={isOpen}
			onClose={closeDrawer}
		>
			<List>
				{renderedDatabaseList}
				<Divider/>
				<ListActions/>
			</List>
		</Drawer>
	)
}
