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

import { ListData, PurchaseState } from './ListData'

export interface ListContentsProps {
  focusedList: ListData
  setFocusedList: (listData: ListData) => void
}

export default (props: ListContentsProps) => {
  const {focusedList, setFocusedList} = props

  const [showPurchased, setShowPurchased] = React.useState(false)
  const [showStores, setShowStores] = React.useState(false)
  const [editingItems, setEditingItems] = React.useState(false)

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
          variant={showStores ? "contained" : "outlined"}
          onClick={() => setShowStores(!showStores)}
        >
          Show Prefered Store
        </Button>
        <Button
          variant={editingItems ? "contained" : "outlined"}
          onClick={() => setEditingItems(!editingItems)}
        >
          Edit Items
        </Button>
      </ButtonGroup>
      <Button>
        Add Item
      </Button>
      <Button>
        Checkout
      </Button>
      <List
        sx={{width: '80%', float: "right"}}
        subheader={<ListSubheader>Item List</ListSubheader>}
      >
        {unpurchasedItems(focusedList)}
        <Divider/>
        {showPurchased && purchasedItems(focusedList)}
      </List>
    </Box>
  )
}

const unpurchasedItems = (focusedList: ListData) => {
  return ( 
    <Box>
      {focusedList.items
        .filter((item) => (
          item.state != PurchaseState.PURCHASED
        ))
        .sort((item1, item2) => (
          item1.state - item2.state
        ))
        .map(item => (
          <ListItem>
            <ListItemText>
              {item.name}
            </ListItemText>
            <Switch checked={item.state == PurchaseState.IN_CART}/>
          </ListItem>
        ))
      }
    </Box>
  )
}

const purchasedItems = (focusedList: ListData) => {
  return (
    <Box>
      <ListSubheader>Already Purchased</ListSubheader>
      {focusedList.items
        .filter((item) => (
          item.state == PurchaseState.PURCHASED
        ))
        .map(item => (
          <ListItem>
            <ListItemText>
              {item.name}
            </ListItemText>
            <Button>
              Readd to List
            </Button>
          </ListItem>         
        ))
      }
    </Box>
  )
}