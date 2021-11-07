import { PurchaseState, ListData } from './components/ListData';

export const sampleData: ListData[] = [
  {
    _id: "abcdef",
    _rev: "32_abcdef",
    name: "primary shopping",
    items: [
      {
        name: "Apples",
        state: PurchaseState.TO_BUY,
        updated: new Date()
      },
      {
        name: "Bananas",
        state: PurchaseState.IN_CART,
        updated: new Date()
      },
      {
        name: "Sugar",
        state: PurchaseState.PURCHASED,
        updated: new Date()
      }
    ]
  },
  {
    _id: "123456",
    _rev: "91_njanjag",
    name: "secondary list",
    items: [
      {
        name: "Milk",
        state: PurchaseState.TO_BUY,
        updated: new Date()
      }
    ]
  },
  {
    _id: "819851",
    _rev: "31_notReal",
    name: "one more",
    items: [
      {
        name: "Pickeles",
        state: PurchaseState.TO_BUY,
        updated: new Date()
      },
      {
        name: "Fish",
        state: PurchaseState.TO_BUY,
        updated: new Date()
      }
    ]
  }
]