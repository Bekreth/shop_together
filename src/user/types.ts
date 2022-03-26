import { StorageMetadata } from "utils/pouchTypes"

export enum UserDBType {
	SERVER="SERVER",
	DATABASE="DATABASE",
}

export const userID = "user_data"
export const userDB = "user_data"

export interface User extends StorageMetadata {
	username: string
}

export interface Server extends StorageMetadata {
	serverName: string
	address: string
	username: string
	port: number
}

export interface Database extends StorageMetadata {
	serverName: string
	name: string
	list: string
}

export const initUser: User = {
	_id: userID,
	username: "unknown"
}
