import React from 'react';
import { NavigateFunction, useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import Divider from '@mui/material/Divider';

import { ListMetadata, ListData } from './ListData';
import CreateList from './CreateList';

export interface ShoppingListsProps {
  listsData: ListMetadata[]
  createList: (newList: ListData) => void
  closeDrawer: () => void
}

export default (props: ShoppingListsProps) => {
  const {listsData, createList, closeDrawer} = props
  const navigate = useNavigate()

  return (
    <List>
      {listsData.map((data) => ( 
        ShoppingList(data, navigate, closeDrawer)
       ))}
      <Divider/>
      <ListActions createList={createList}/>
    </List>
  )
}

const ShoppingList = (
  list: ListMetadata, 
  navigate: NavigateFunction,
  closeDrawer: () => void
) => {
  return (
    <ListItem 
      button 
      key={list.name}
      onClick={() => {
        const base = encodeURIComponent(list.name)
        navigate(`/lists/${base}`)
        closeDrawer()
      }}
    >
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