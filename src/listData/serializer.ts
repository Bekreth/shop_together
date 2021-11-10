import { ListData } from 'listData/listData'

export const serializeList: (list: ListData) => string = (list: ListData) => {
  return JSON.stringify(list)
}

export const deserializeList: (input: string) => ListData= (input: string) => {
  return JSON.parse(input)
}