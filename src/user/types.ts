import { StorageMetadata } from "utils/pouchTypes"

export enum UserDBType {
	USER="USER",
	SERVER="SERVER",
	DATABASE="DATABASE",
}

export const userID = "user_data"
export const userDB = "user_data"

export interface User extends StorageMetadata {
	type: string
	username: string
}

export interface Server extends StorageMetadata {
	type: string
	serverName: string
	address: string
	password: string
	username: string
	port: number
}

export interface Database extends StorageMetadata {
	type: string
	serverID?: string
	databaseName: string
}

export const initUser: User = {
	type: UserDBType.USER,
	_id: userID,
	username: "unknown"
}

