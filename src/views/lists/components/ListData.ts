export interface ListData extends ListMetadata, Items {
}

export interface ListMetadata {
  _id: string
  _rev: string
  name: string
}

export interface Items {
  items: Item[]
}

export interface Item {
  name: string
  state: PurchaseState
  updated: Date
}

export enum PurchaseState {
  TO_BUY = "TO_BUY",
  IN_CART = "IN_CART",
  PURCHASED = "PURCHASED"
}

export const makeList: (name: string) => ListData = (name: string) => {
  return {
      _id: "Some value",
      _rev: "Gotta make this better",
      name: name,
      items: []
  }
}

export const makeItem: (name: string) => Item = (name: string) => {
  return {
    name: name,
    state: PurchaseState.TO_BUY,
    updated: new Date()
  }
}