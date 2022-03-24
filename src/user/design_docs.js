
export const doc_type = {
	views: {
		doc_type: {
			map: function(doc) {
				if (doc.doc_type) {
					emit(doc.doc_type, doc.name)
				}
			}
		}
	}
}
