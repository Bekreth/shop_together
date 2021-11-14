import {useContext, useState} from 'react';

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

import { DatabaseContext } from 'index';
import { Item, ListData, PurchaseState } from 'listData'
import CreateItem from 'views/lists/components/CreateItem';
import EditItem from 'views/lists/components/EditItem';

const emptyItem: Item = {
  name: "",
  description: "",
  state: PurchaseState.TO_BUY,
  created: new Date(),
  updated: new Date(),
}

export interface ListContentsProps {
  focusedList: ListData
}

export default (props: ListContentsProps) => {
  const {focusedList} = props
  const dbClient = useContext(DatabaseContext)

  const [listContents, setListContents] = useState(focusedList)
  const [showPurchased, setShowPurchased] = useState(false)
  const [editable, setEditability] = useState(false)
  const [creatingItem, setCreatingItem] = useState(false)
  const [editingItem, setEditingItem] = useState(emptyItem)

  const toggleCart = (list: ListData, itemName: string) => {
    list.items
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
    dbClient.updateList({...list})
      .then(setListContents)
      .catch(console.error)
  }

  const purchaseItems = (list: ListData) => {
    list.items
      .map(item => {
        if (item.state === PurchaseState.IN_CART) {
          item.state = PurchaseState.PURCHASED
        }
        return item
      })
    dbClient.updateList({...list})
      .then(setListContents)
      .catch(console.error)
  }

  const returnToBuy = (list: ListData, itemName: string) => {
    list.items
      .map(item => {
        if (item.name !== itemName) {
          return item
        }
        item.state = PurchaseState.TO_BUY
        return item
      })
    dbClient.updateList({...list})
      .then(setListContents)
      .catch(console.error)
  }

  const createItemAppender = (list: ListData) => {
    return (item: Item) => {
      list.items.push(item)
      dbClient.updateList({...list})
        .then(setListContents)
        .catch(console.error)
    }
  }

  const openItemEditor = (item: Item) => {
    setEditingItem(item)
  }

  const saveItemEdits = (originialItemName: string, item: Item) => {
    const newItemList = listContents.items
      .map(listItem => {
        if (listItem.name === originialItemName) {
          return item
        }
        return listItem
      })
    dbClient.updateList({...listContents, items: newItemList})
      .then(setListContents)
      .catch(console.error)
  }

  const deleteItem = (item: Item) => {
    const newItemList = listContents.items
      .filter(listItem => listItem.name !== item.name)
    dbClient.updateList({...listContents, items: newItemList})
      .then(setListContents)
      .catch(console.error)
  }

  const modifiableItems = {
    list: listContents,
    editingItems: editable,
    toggleItem: toggleCart,
    returnToBuy: returnToBuy,
    openItemEditor: openItemEditor,
    deleteItem: deleteItem
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
          variant={editable ? "contained" : "outlined"}
          onClick={() => setEditability(!editable)}
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
        onClick={() => purchaseItems(listContents)}
      >
        Checkout
      </Button>
      <CreateItem
        listName={focusedList.name}
        addItem={createItemAppender(listContents)}
        isOpen={creatingItem}
        close={() => setCreatingItem(false)}
      />
      <List
        sx={{width: '80%', float: "right"}}
        subheader={<ListSubheader>Item List</ListSubheader>}
      >
        {unpurchasedItems(modifiableItems)}
        <Divider/>
        {showPurchased && purchasedItems(modifiableItems)}
      </List>
      <EditItem 
        item={editingItem}
        saveItemEdits={saveItemEdits}
        isOpen={editingItem !== emptyItem }
        close={() => setEditingItem(emptyItem)}
      />
    </Box>
  )
}

const unpurchasedItems = (input: {
  list: ListData,
  toggleItem: (list: ListData, itemName: string) => void,
  editingItems: boolean,
  openItemEditor: (item: Item) => void,
  deleteItem: (item: Item) => void
}) => {
  const {list, toggleItem, editingItems, openItemEditor, deleteItem} = input
  return ( 
    <Box>
      {list.items
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
            {editingItems &&
              <Box>
                <Button
                  variant="outlined"
                  onDoubleClick={() => deleteItem(item)}
                  color='warning'
                >
                  Delete
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => openItemEditor(item)}
                >
                  Edit
                </Button>
              </Box>
            }
            <Switch 
              onChange={() => toggleItem(list, item.name)}
              checked={item.state === PurchaseState.IN_CART}
            />
          </ListItem>
        ))
      }
    </Box>
  )
}

const purchasedItems = (input: {
  list: ListData,
  returnToBuy: (list: ListData, itemName: string) => void,
  editingItems: boolean,
  openItemEditor: (item: Item) => void,
  deleteItem: (item: Item) => void
}) => {
  const {list, returnToBuy, editingItems, openItemEditor, deleteItem} = input
  return (
    <Box>
      <ListSubheader>Already Purchased</ListSubheader>
      {list.items
        .filter((item) => (
          item.state === PurchaseState.PURCHASED
        ))
        .map(item => (
          <ListItem>
            <ListItemText>
              {item.name}
            </ListItemText>
            {editingItems &&
              <Box>
                <Button
                  variant="outlined"
                  onClick={() => openItemEditor(item)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  onDoubleClick={() => deleteItem(item)}
                  color='warning'
                >
                  Delete
                </Button>
              </Box>
            }
            <Button
              onClick={() => returnToBuy(list, item.name)}
            >
              Readd to List
            </Button>
          </ListItem>         
        ))
      }
    </Box>
  )
}