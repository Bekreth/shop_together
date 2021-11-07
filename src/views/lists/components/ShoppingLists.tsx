import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InboxIcon from '@mui/icons-material/Inbox';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import Divider from '@mui/material/Divider';

import ListData from './ListData';
import CreateList from './CreateList';

export interface ShoppingListsProps {
  listsData: ListData[]
  createList: (newList: ListData) => void
}

export default (props: ShoppingListsProps) => {
  const {listsData, createList} = props

  return (
    <List>
      {listsData.map(ShoppingList)}
      <Divider/>
      <ListActions createList={createList}/>
    </List>
  )
}

const ShoppingList = (list: ListData) => {
  return (
    <ListItem button key={list.name}>
      <ListItemIcon>
        <InboxIcon/>
      </ListItemIcon>
      <ListItemText primary={list.name}/>
    </ListItem>
  )
}

const ListActions = (props: {createList: (newList: ListData) => void}) => {
  const createList = "Create List"
  const editList = "Edit List"
  const {createList: addToList} = props
  const [isCreatingList, setCreatingList] = React.useState(false)

  return (
    <Box>
      <ListItem 
        button 
        onClick={() => setCreatingList(true)} 
        key={createList}
      >
        <ListItemIcon>
          <AddIcon/>
        </ListItemIcon>
        <ListItemText primary={createList}/>
      </ListItem>    
      <ListItem button key={editList}>
        <ListItemIcon>
          <SettingsIcon/>
        </ListItemIcon>
        <ListItemText primary={editList}/>
      </ListItem>
      <CreateList 
        isOpen={isCreatingList} 
        close={() => setCreatingList(false)}
        addList={addToList}
      />
    </Box>
  )
}