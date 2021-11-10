import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Switch from '@mui/material/Switch';

import { Item, ListData, PurchaseState } from 'listData'
import CreateItem from 'views/lists/components/CreateItem';

export interface ListContentsProps {
  focusedList: ListData
}

export default (props: ListContentsProps) => {
  const {focusedList} = props

  const [itemList, setItemList] = React.useState(focusedList.items)
  const [showPurchased, setShowPurchased] = React.useState(false)
  const [editingItems, setEditingItems] = React.useState(false)
  const [creatingItem, setCreatingItem] = React.useState(false)

  const toggleCart = (items: Item[], itemName: string) => {
    const output = items
      .map(item => { 
        if (item.name !== itemName) {
          return item
        }
        if (item.state === PurchaseState.TO_BUY) {
          item.state = PurchaseState.IN_CART
        } else if (item.state === PurchaseState.IN_CART) {
          item.state = PurchaseState.TO_BUY
        }
        return item
      })
    setItemList(output)
  }

  const purchaseItems = (items: Item[]) => {
    const output = items
      .map(item => {
        if (item.state === PurchaseState.IN_CART) {
          item.state = PurchaseState.PURCHASED
        }
        return item
      })
    setItemList(output)
  }

  const returnToBuy = (items: Item[], itemName: string) => {
    const output = items
      .map(item => {
        if (item.name !== itemName) {
          return item
        }
        item.state = PurchaseState.TO_BUY
        return item
      })
    setItemList(output)
  }

  const createItemAppender = (items: Item[]) => {
    return (item: Item) => {
      items.push(item)
    }
  }

  return (
    <Box>
      <ButtonGroup variant="contained">
        <Button 
          variant={showPurchased ? "contained" : "outlined"}
          onClick={() => setShowPurchased(!showPurchased)}
        >
          Show Purchased Items
        </Button>
        <Button
          variant={editingItems ? "contained" : "outlined"}
          onClick={() => setEditingItems(!editingItems)}
        >
          Edit Items
        </Button>
      </ButtonGroup>
      <br/>
      <br/>
      <Button
        onClick={() => setCreatingItem(true)}
      >
        Add Item
      </Button>
      <Button
        onClick={() => purchaseItems(itemList)}
      >
        Checkout
      </Button>
      <CreateItem
        listName={focusedList.name}
        addItem={createItemAppender(itemList)}
        isOpen={creatingItem}
        close={() => setCreatingItem(false)}
      />
      <List
        sx={{width: '80%', float: "right"}}
        subheader={<ListSubheader>Item List</ListSubheader>}
      >
        {unpurchasedItems(itemList, toggleCart)}
        <Divider/>
        {showPurchased && 
          purchasedItems(itemList, returnToBuy)}
      </List>
    </Box>
  )
}

const unpurchasedItems = (
  itemList: Item[], 
  toggleItem: (items: Item[], itemName: string) => void,
) => {
  return ( 
    <Box>
      {itemList
        .filter((item) => (
          item.state !== PurchaseState.PURCHASED
        ))
        .sort((item1, item2) => (
          item1.name.localeCompare(item2.name)
        ))
        .map(item => (
          <ListItem>
            <ListItemText>
              {item.name}
            </ListItemText>
            <Switch 
              onChange={() => toggleItem(itemList, item.name)}
              checked={item.state === PurchaseState.IN_CART}
            />
          </ListItem>
        ))
      }
    </Box>
  )
}

const purchasedItems = (
  itemList: Item[],
  returnToBuy: (items: Item[], itemName: string) => void,
) => {
  return (
    <Box>
      <ListSubheader>Already Purchased</ListSubheader>
      {itemList
        .filter((item) => (
          item.state === PurchaseState.PURCHASED
        ))
        .map(item => (
          <ListItem>
            <ListItemText>
              {item.name}
            </ListItemText>
            <Button
              onClick={() => returnToBuy(itemList, item.name)}
            >
              Readd to List
            </Button>
          </ListItem>         
        ))
      }
    </Box>
  )
}