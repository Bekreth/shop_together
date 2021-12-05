import {Items, ListData, ListHeader, StorageMetadata, ListType, PurchaseState} from "listData"
import {item_picker, shoppingListResolver} from "listStorage/conflictResolution"
import {testMetadata1, testMetadata2, testListHeader, testItemList, testList, testDate2, testDate1, testItem1, testItem2} from './testData'

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

test("List additions join", () => {
  const input1 = {items: {"item1ID": testItem1}}
  const input2 = {items: {"item2ID": testItem2}}

  const expected_output = {
    items: {
      "item1ID": testItem1,
      "item2ID": testItem2
    }
  }
  expect(item_picker(input1, input2))
    .toStrictEqual(expected_output)
})

export {}