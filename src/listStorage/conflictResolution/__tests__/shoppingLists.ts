import {Items, ListData, ListHeader, StorageMetadata, ListType, PurchaseState} from "listData"
import {shoppingListResolver} from "listStorage/conflictResolution"
import {testMetadata1, testMetadata2, testListHeader, testItemList, testList, testDate2, testDate1} from './testData'

const validateOrderless = (list1: ListData, list2: ListData, expectedList: ListData) => {
  const rightReduce = shoppingListResolver(list2, list1)
  expect(rightReduce).toStrictEqual(expectedList)
  const leftReduce = shoppingListResolver(list1, list2)
  expect(leftReduce).toStrictEqual(expectedList)
}

test("Identical list do not change", () => {
  validateOrderless(testList, testList, testList)
});

test("List name changes should win by updated date", () => {
  const input: ListData = {
    ...testList,
    _rev: "3_someRev2",
    name: "A new name!",
    updated: testDate2,
  }

  const expectedList: ListData = {
    _id: "someID1",
    _rev: "3_someRev2",
    type: ListType.SHOPPING,
    name: "A new name!",
    created: testDate1,
    updated: testDate2,
    items: testItemList,
  }
  validateOrderless(testList, input, expectedList)
})

export {}