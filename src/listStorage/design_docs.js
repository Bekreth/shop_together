const emit = 0

export const docTypeID = "_design/listStore"

export const listViews = {
	_id: docTypeID,
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
