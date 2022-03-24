
export enum UserDBType {
	SERVER="SERVER",
	DATABASE="DATABASE",
}

export interface DocType {
	_id: string
	_rev: string
	modify_date: Date
}

export const user_id = "user_data"

export interface User extends DocType {
	username: string
}

export interface Server extends DocType {
	name: string
	address: string
	user_name: string
	port: number
}

export interface Database extends DocType {
	server: string
	name: string
	list: string
}
