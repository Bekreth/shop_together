export const designDocName = "userData"
export const designDocPath = `_design/${designDocName}`

const emit = 0
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
					emit(doc.databaseName)
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
}

export const getView = (view: View) => {
	return `${designDocName}/${view}`
}
