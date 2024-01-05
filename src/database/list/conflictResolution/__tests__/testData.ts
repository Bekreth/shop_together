import { StorageMetadata } from "utils/pouchTypes"

import {
	ListData,
	ListHeader,
	ListType,
	PurchaseState,
	ItemKey,
} from "database/list"

test.skip("skip", () => ({}))

export const testDate1 = new Date(Date.parse("01 Dec 2021 00:00:00 GMT"))
export const testDate2 = new Date(Date.parse("02 Dec 2021 00:00:00 GMT"))
export const testDate3 = new Date(Date.parse("03 Dec 2021 00:00:00 GMT"))
export const testDate4 = new Date(Date.parse("04 Dec 2021 00:00:00 GMT"))

export const testMetadata1: StorageMetadata = {
	_id: "someID1",
	_rev: "1_someRev1"
}

export const testMetadata2: StorageMetadata = {
	_id: "someID1",
	_rev: "2_someRev2"
}

export const testListHeader: ListHeader = {
	type: ListType.SHOPPING,
	name: "ListName1",
	created: testDate1,
	updated: testDate1
}

export const testItem1 = {
	_id: "item1ID",
	_rev: "1_someRev1",
	name: "Item1",
	state: PurchaseState.TO_BUY,
	price: undefined,
	created: testDate1,
	updated: testDate1,
}

export const testItem2 = {
	_id: "item2ID",
	_rev: "1_someRev1",
	name: "Item2",
	state: PurchaseState.PURCHASED,
	price: undefined,
	created: testDate1,
	updated: testDate1,
}

export const testItem3 = {
	_id: "item3ID",
	_rev: "1_someRev1",
	name: "Item3",
	state: PurchaseState.IN_CART,
	price: undefined,
	created: testDate1,
	updated: testDate1,
}

export const testItemList: ItemKey = {  
	"item1ID": testItem1,
	"item2ID": testItem2,
	"item3ID": testItem3,
}

export const testList: ListData = {
	...testMetadata1,
	...testListHeader,
	items: testItemList,
}

