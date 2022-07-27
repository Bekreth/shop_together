import React from "react"

import { useState } from "react"

import Accordion from "@mui/material/Accordion"
import AccordionDetails from "@mui/material/AccordionDetails"
import AccordionSummary from "@mui/material/AccordionSummary"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"

import { Database } from "user"

export interface DatabaseContainerProps {
	database: Database
	lists: string[]
	closeDrawer: () => void
}

export default function DatabaseContainer(props: DatabaseContainerProps) {
	const { 
		database,
		lists,
		closeDrawer,
	} = props

	const [expanded, setExpanded] = useState(true)

	return (
		<Accordion
			expanded={expanded}
			onClick={() => setExpanded(!expanded)}
		>
			<AccordionSummary>
				{database.databaseName}
			</AccordionSummary>
			<AccordionDetails>
				<List>
					{lists.map(list => {
						return (
							<ListItem 
								button
								key={list}
								onClick={() => {
									console.log("TODO, List route")
									closeDrawer()
								}}
							>
								{list}
							</ListItem>
						)
					})}
				</List>
			</AccordionDetails>
		</Accordion>
	)
}
