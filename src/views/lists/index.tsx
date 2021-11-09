import React from 'react';
import {useParams} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import ListContents from './components/ListContents'
import ShoppingLists from './components/ShoppingLists';
import { ListData } from './components/ListData'
import { sampleData } from './data'

const emptyList: ListData = {
  _id: "",
  _rev: "",
  name: "",
  items: []
}

export default () => {
  const [isOpen, setOpen] = React.useState(false)
  const [shoppingLists, setLists] = React.useState(sampleData)
  const [focusedList, setFocusedList] = React.useState(emptyList)
  const {listName} = useParams()

  if (listName !== undefined) {
    const filteredList = shoppingLists.filter(list => list.name === listName)
    if (filteredList.length === 1 && filteredList[0] !== focusedList) {
      setFocusedList(filteredList[0])
    }
  }

  const toggleDrawer = () => {
    setOpen(!isOpen)
  }

  const closeDrawer = () => {
    setOpen(false)
  }

  const appendList = (newList: ListData) => {
    setLists(shoppingLists.concat(newList))
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Shop Together
          </Typography>
          {listName !== "" &&
            <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
              {listName}
            </Typography>
          }
        </Toolbar>
      </AppBar>
      {isOpen && 
        <Drawer
          anchor="left"
          open={isOpen}
          onClose={closeDrawer}
        >
          <ShoppingLists 
            listsData={shoppingLists}
            createList={appendList}
            closeDrawer={closeDrawer}
          />
        </Drawer>
      }
      {focusedList !== emptyList && 
        <ListContents
          focusedList={focusedList}
        />
      }
    </Box>
  );
}