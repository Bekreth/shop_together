// TODO: have these values be configurable from the constructor
export const scheme = "http"
export const host = "192.168.1.10"
export const port = "5984"
export const databaseName = "group_lists"
export const username = "shop_together"
export const password = "password"

export const cleanup_timer = 5_000
export const designDoc = "list_views.json"
export enum View {
  ConflictingLists = "conflictingLists",
  ListByName = "listByName",
  ListNames = "listNames",
}
export const getView = (view: View) => {
	return `${designDoc}/${view}`
}
