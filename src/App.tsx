import React from "react"

import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import BasicCard from "views/login/BasicCard"
import Lists from "views/lists"
import "./App.css"

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/login" element={<BasicCard />} />
				<Route path="/lists" element={<Lists />} />
				<Route path="/lists/:listName" element={<Lists />} />
				<Route path="/*" element={<Navigate to="/lists" />} />
			</Routes>
		</Router>
	)
}
 
export default App
