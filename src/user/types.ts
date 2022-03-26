import { StorageMetadata } from "utils/pouchTypes"

export enum UserDBType {
	SERVER="SERVER",
	DATABASE="DATABASE",
}

export const user_id = "user_data"

export interface User extends StorageMetadata {
	username: string
}

export interface Server extends StorageMetadata {
	name: string
	address: string
	user_name: string
	port: number
}

export interface Database extends StorageMetadata {
	server: string
	name: string
	list: string
}

export const initUser: User = {
	_id: user_id,
	username: "unknown"
}
