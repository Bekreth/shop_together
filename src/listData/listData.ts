export interface ListData extends ListMetadata, Items {}

export enum ListType {
    SHOPPING = "SHOPPING",
    TODO = "TODO"
} 

export interface ListMetadata {
  _id: string
//   _rev: string
  name: string
  type: ListType
}

export interface Items {
  items: Item[]
}

export interface Item {
  name: string
  description: string
  state: PurchaseState | TodoState
  created: Date
  updated: Date
}

export enum PurchaseState {
  TO_BUY = "TO_BUY",
  IN_CART = "IN_CART",
  PURCHASED = "PURCHASED"
}


export enum TodoState {
    TODO = "TODO",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE"
}

export const makeList: (name: string) => ListData = (name: string) => {
  return {
      _id: "Some value",
    //   _rev: "Gotta make this better", // TODO: Needs better construction
      name: name,
      type: ListType.SHOPPING, // TODO: this needs a real value
      items: []
  }
}

export const makeItem: (name: string) => Item = (name: string) => {
  return {
    name: name,
    description: "", //TODO: This needs a real value
    state: PurchaseState.TO_BUY,
    created: new Date(),
    updated: new Date()
  }
}