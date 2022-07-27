export const designDocName = "listStore"
export const designDocPath = `_design/${designDocName}`

/*
const emit: (key: any, value: any) => void = (key: any, value: any) => {
	console.log("You should never see this")
}
*/

export const designDoc = {
	_id: designDocPath,
	views: {
		listNames: {
			map: `function(doc) {
				emit(doc.name, doc.name)
			}`,
			reduce: `function(keys, values, rereduce) {
				if (rereduce) {
					return [...values[0], ...values[1]]
				} else {
					return values
				}
			}`, 
		},
		listByName: {
			map: `function(doc) {
				emit(doc.name, doc)
			}`
		},
		conflictingLists: {
			map: `function(doc) {
				emit(doc._id, [doc._rev, ...doc._conflicts])
			}`
		},
	}
}

export enum View {
  ConflictingLists = "conflictingLists",
  ListByName = "listByName",
  ListNames = "listNames",
}

export const getView = (view: View) => {
	return `${designDocName}/${view}`
}
