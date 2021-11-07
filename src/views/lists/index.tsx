import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import ShoppingLists from './components/ShoppingLists';
import ListData from './components/ListData'
import {sampleData} from './data'

export default () => {
  const [isOpen, setOpen] = React.useState(false)
  const [shoppingLists, setLists] = React.useState(sampleData)
  const handleListsClicked = () => {
    setOpen(!isOpen)
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
            onClick={handleListsClicked}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Shop Together
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      {isOpen && 
        <Drawer
          anchor="left"
          open={isOpen}
          onClose={() => setOpen(false)}
        >
          <ShoppingLists 
            listsData={shoppingLists}
            createList={appendList}
          />
        </Drawer>
      }
    </Box>
  );
}