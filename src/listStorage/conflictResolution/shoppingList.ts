import { Item, ListData } from "listData";
import { JoinedMapKeys, missing_map_keys } from "utils/missingMapKeys";
import { itemResolver } from "./items";

export const shoppingListResolver = (previous: ListData, current: ListData) => {
  if (previous._rev === undefined || current._rev === undefined) {
    return previous
  }
  const previous_rev: number = +(previous._rev.split("_")[0])
  const current_rev: number = +(current._rev.split("_")[0])

  const largest_rev = previous_rev > current_rev ? previous._rev : current._rev
  const largest_updated = previous.updated > current.updated ? previous.updated : current.updated

  const overlapping_keys: JoinedMapKeys = missing_map_keys(
    previous.items, 
    current.items,
  )

  const output_item: {[key: string]: Item} = {}

  Object.keys(overlapping_keys.keys1)
    .forEach(key => {
      output_item[key] = previous.items[key]
    })

  Object.keys(overlapping_keys.keys2)
    .forEach(key => {
      output_item[key] = current.items[key]
    })
  
  Object.keys(overlapping_keys.joint_keys)
    .map(key => {
      return itemResolver(previous.items[key], current.items[key])
    })
    .forEach(item => {
      output_item[item._id] = item
    })

  return {
    _id: previous._id,
    _rev: largest_rev,
    type: previous.type,
    name: name_picker(previous, current),
    updated: largest_updated,
    created: previous.created,
    items: output_item
  }
}

function name_picker(previous: ListData, current: ListData): string {
  if (previous.name === current.name) return previous.name
  if (previous.updated > current.updated) return previous.name
  return current.name
}
