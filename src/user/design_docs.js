const emit = 0

export const docTypeID = "_design/userData"

export const docType = {
	_id: docTypeID,
	views: {
		docType: {
			map: function(doc) {
				if (doc.doc_type) {
					emit(doc.doc_type, doc.name)
				}
			}
		}.toString(),
	}
}

