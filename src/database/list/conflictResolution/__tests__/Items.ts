import { Item, PurchaseState } from "database/list"
import { itemResolver } from "database/list/conflictResolution/items"
import { testDate2, testItemList } from "./testData"

const validateOrderless = (item1: Item, item2: Item, expectedItem: Item) => {
	const rightReduce = itemResolver(item1, item2)
	expect(rightReduce).toStrictEqual(expectedItem)
	const leftReduce = itemResolver(item1, item2)
	expect(leftReduce).toStrictEqual(expectedItem)
}

test("Identical items do not change", () => {
	validateOrderless(
		testItemList["item1ID"],
		testItemList["item1ID"],
		testItemList["item1ID"]
	)
})

test("Last-write-wins in name changes", () => {
	const item = {...testItemList["item1ID"]}
	const updated_item = {
		...item,
		_rev: "3-hello",
		name: "new name",
		updated: testDate2
	}
  
	const expected_item = {
		...item,
		_rev: "3-hello",
		name: "new name",
		updated: testDate2
	}

	validateOrderless(item, updated_item, expected_item)
})

test("Identical state only updates rev/updated by latest", () => {
	const item = {
		...testItemList["item1ID"],
		state: PurchaseState.PURCHASED,
	}
	const updated_item = {
		...item,
		_rev: "3-hello",
		updated: testDate2
	}
	const expected_item = {
		...updated_item
	}

	validateOrderless(item, updated_item, expected_item)
})

test("Purchase beats to buy", () => {
	const item = {
		...testItemList["item1ID"],
		state: PurchaseState.TO_BUY,
	}
	const updated_item = {
		...item,
		_rev: "3-hello",
		state: PurchaseState.PURCHASED,
		updated: testDate2
	}
	const expected_item = {
		...updated_item
	}

	validateOrderless(item, updated_item, expected_item)
})
