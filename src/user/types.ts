import { StorageMetadata } from "utils/pouchTypes"

export enum UserDBType {
	USER="USER",
	SERVER="SERVER",
	DATABASE="DATABASE",
}

export const userID = "user_data"
export const userDB = "user_data"

export interface User extends StorageMetadata {
	_fileType: string
	username: string
}

export interface Server extends StorageMetadata {
	_fileType: string
	serverName: string
	address: string
	password: string
	username: string
	port: number
}

export interface Database extends StorageMetadata {
	_fileType: string
	serverName: string
	name: string
}

export const initUser: User = {
	_fileType: UserDBType.USER,
	_id: userID,
	username: "unknown"
}

