export const designDocName = "userData"
export const designDocPath = `_design/${designDocName}`

/*
const emit: (key: any, value: any) => void = (key: any, value: any) => {
	console.log("You should never see this")
}
*/

export const designDoc = {
	_id: designDocPath,
	views: {
		docType: {
			map: `function(doc) {
				if (doc.type) {
					emit(doc.type, doc)
				}
			}`,
			reduce: `function(keys, values, rereduce) {
				if (rereduce) {
					return [...values[0], ...values[1]]
				} else {
					return values
				}
			}`
		},
		databaseName: {
			map: `function(doc) {
				if (doc.type == "DATABASE") {
					emit(doc.databaseName, doc)
				}
			}`,
			reduce: `function(keys, values, rereduce) {
				if (rereduce) {
					return [...values[0], ...values[1]]
				} else {
					return values
				}
			}`,
		},
		serverName: {
			map: `function(doc) {
				if (doc.type == "SERVER") {
					emit(doc.serverName, doc)
				}
			}`,
			reduce: `function(keys, values, rereduce) {
				if (rereduce) {
					return [...values[0], ...values[1]]
				} else {
					return values
				}
			}`,
		}
	}
}

export enum View {
	DocType = "docType",
	DatabaseName = "databaseName",
	ServerName = "serverName",
}

export const getView = (view: View) => {
	return `${designDocName}/${view}`
}
