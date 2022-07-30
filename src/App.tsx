import React  from "react"

import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import HeadBar from "HeadBar"
import Home from "views/home"
import ShoppingList from "views/lists"
import Profile from "views/profile"
import "App.css"
import Context from "Context"

function App() {
	return (
		<Context>
			<Router>
				<HeadBar/>
				<br/>
				<Routes>
					<Route path="/home" element={<Home />} />
					<Route 
						path="/database/:databaseName/list/:listName"
						element={<ShoppingList />}
					/>
					<Route path="/profile" element={<Profile />} />
					<Route path="/*" element={<Navigate to="/home"/>} />
				</Routes>
			</Router>
		</Context>
	)
}
 
export default App
