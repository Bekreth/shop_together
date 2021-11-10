import { PurchaseState, ListData, ListType } from 'listData';

export const sampleData: ListData[] = [
  {
    _id: "abcdef",
    _rev: "32_abcdef",
    name: "primary shopping",
    type: ListType.SHOPPING,
    items: [
      {
        name: "Apples",
        description: "something",
        state: PurchaseState.TO_BUY,
        updated: new Date(),
        created: new Date()
      },
      {
        name: "Bananas",
        description: "something",
        state: PurchaseState.IN_CART,
        updated: new Date(),
        created: new Date()
      },
      {
        name: "Sugar",
        description: "something",
        state: PurchaseState.PURCHASED,
        updated: new Date(),
        created: new Date()
      }
    ]
  },
  {
    _id: "123456",
    _rev: "91_njanjag",
    name: "secondary list",
    type: ListType.SHOPPING,
    items: [
      {
        name: "Milk",
        description: "something",
        state: PurchaseState.TO_BUY,
        updated: new Date(),
        created: new Date()
      }
    ]
  },
  {
    _id: "819851",
    _rev: "31_notReal",
    name: "one more",
    type: ListType.SHOPPING,
    items: [
      {
        name: "Pickeles",
        description: "something",
        state: PurchaseState.TO_BUY,
        updated: new Date(),
        created: new Date()
      },
      {
        name: "Fish",
        description: "something",
        state: PurchaseState.TO_BUY,
        updated: new Date(),
        created: new Date()
      }
    ]
  }
]