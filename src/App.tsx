import React from "react"
import {useState, useEffect, useContext} from "react"


import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import HeadBar from "HeadBar"
import Home from "views/home"
import Lists from "views/lists"
import Profile from "views/profile"
import "./App.css"

function App() {

	return (
		<Router>
			<HeadBar/>
			<Routes>
				<Route path="/home" element={<Home />} />
				<Route path="/lists/:listName" element={<Lists />} />
				<Route path="/profile" element={<Profile />} />
			</Routes>
		</Router>
	)
}
 
export default App
