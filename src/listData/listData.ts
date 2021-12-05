import {v4 as uuidv4} from 'uuid'

export interface ListData extends StorageMetadata, ListHeader, Items {}

export enum ListType {
    SHOPPING = "SHOPPING",
} 

export interface StorageMetadata {
  _id: string
  _rev?: string
  _deleted?: boolean
}

export interface ListHeader {
  name: string
  type: ListType
  created: Date
  updated: Date
}

export type ItemKey = {[key: string]: Item}
export interface Items {
  items: ItemKey
}

export interface Item extends StorageMetadata {
  name: string
  state: PurchaseState 
  created: Date
  updated: Date
}

export enum PurchaseState {
  TO_BUY = "TO_BUY",
  IN_CART = "IN_CART",
  PURCHASED = "PURCHASED"
}


export const makeList: (name: string) => ListData = (name: string) => {
  return {
      _id: uuidv4(),
      name: name,
      type: ListType.SHOPPING, // TODO: this needs a real value
      created: new Date(),
      updated: new Date(),
      items: {}
  }
}

export const makeItem: (name: string) => Item = (name: string) => {
  return {
    _id: uuidv4(),
    // TODO: Remove this rev and have items be their own object
    _rev: uuidv4(),
    name: name,
    state: PurchaseState.TO_BUY,
    created: new Date(),
    updated: new Date()
  }
}