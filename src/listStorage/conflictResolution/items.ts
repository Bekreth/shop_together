import { Item, PurchaseState } from 'listData'

export const itemResolver = (previous: Item, current: Item) => {
  if (previous._rev === undefined || current._rev === undefined) {
    return previous
  }

  const largest_rev = previous._rev > current._rev ? previous._rev : current._rev
  const largest_updated = previous.updated > current.updated ? previous.updated : current.updated

  const output: Item = {
      _id: previous._id,
      _rev: largest_rev,
      name: name_picker(previous, current),
      created: previous.created,
      updated: largest_updated,
      state: state_picker(previous, current),
  }
  return output
}

function name_picker(previous: Item, current: Item): string {
  if (previous.name === current.name) return previous.name
  if (previous.updated > current.updated) return previous.name
  return current.name
}

function state_picker(previous: Item, current: Item): PurchaseState {
  if (previous.state === current.state) return previous.state
  const states = [ previous.state, current.state ].sort()
  const state_predicate = (expected_state: [PurchaseState, PurchaseState]) => { 
    // There has to be a better way of doing Tuple comparisons
    return JSON.stringify(states) === JSON.stringify(expected_state.sort())
  }
  if (state_predicate([PurchaseState.TO_BUY, PurchaseState.IN_CART])) {
    return PurchaseState.IN_CART
  } else if (state_predicate([PurchaseState.TO_BUY, PurchaseState.PURCHASED])) {
    return PurchaseState.PURCHASED
  } else if (state_predicate([PurchaseState.IN_CART, PurchaseState.PURCHASED])) {
    return PurchaseState.PURCHASED
  } else {
    return previous.state
  }
}
