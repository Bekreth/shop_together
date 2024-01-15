import { StorageMetadata } from "utils/pouchTypes"

export enum UserDBType {
	USER="USER",
	SERVER="SERVER",
	DATABASE="DATABASE",
}

export const userID = "user_data"
export const userDB = "shop_together_user_data"

export interface User extends StorageMetadata {
	type: string
	username: string
}

export interface Connection {
	scheme: "http" | "https"
	address: string
	password: string
	username: string
	port: number
}

export function connectionToString(connection: Connection) {
	return `${connection.scheme}://${connection.address}:${connection.port}`
}

export interface Server extends Connection, StorageMetadata {
	type: string
	serverName: string
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

