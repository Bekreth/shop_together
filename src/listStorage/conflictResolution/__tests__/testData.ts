import {Items, ListData, ListHeader, StorageMetadata, ListType, PurchaseState, Item, ItemKey} from "listData"

export const testDate1 = new Date(Date.parse('01 Dec 2021 00:00:00 GMT'))
export const testDate2 = new Date(Date.parse('02 Dec 2021 00:00:00 GMT'))
export const testDate3 = new Date(Date.parse('03 Dec 2021 00:00:00 GMT'))
export const testDate4 = new Date(Date.parse('04 Dec 2021 00:00:00 GMT'))

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

export const testItemList: ItemKey = {  
  "item1ID": {
    _id: "item1ID",
    _rev: "1_someRev1",
    name: "Item1",
    state: PurchaseState.TO_BUY,
    created: testDate1,
    updated: testDate1,
  },
  "item2ID": {
    _id: "item2ID",
    _rev: "1_someRev1",
    name: "Item2",
    state: PurchaseState.PURCHASED,
    created: testDate1,
    updated: testDate1,
  },
  "item3ID": {
    _id: "item3ID",
    _rev: "1_someRev1",
    name: "Item3",
    state: PurchaseState.IN_CART,
    created: testDate1,
    updated: testDate1,
  }
 }

export const testList: ListData = {
  ...testMetadata1,
  ...testListHeader,
  items: testItemList,
}

test("testData.ts", () => {})