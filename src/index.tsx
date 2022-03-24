import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { createContext } from "react"
import { ListStorage } from "listStorage"
import { UserDatabase } from "user"

const userDB = new UserDatabase()
const dbClient = new ListStorage()

export const UserContext = createContext(userDB)
export const DatabaseContext = createContext(dbClient)

ReactDOM.render(
	<React.StrictMode>
		<UserContext.Provider value={userDB}>
			<DatabaseContext.Provider value={dbClient}>
				<App />
			</DatabaseContext.Provider>
		</UserContext.Provider>
	</React.StrictMode>,
	document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
