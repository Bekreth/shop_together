import {useState, useEffect, useContext} from 'react';
import {useParams} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import ListContents from 'views/lists/components/ListContents'
import ShoppingLists from 'views/lists/components/ShoppingLists';
import { ListData, ListType } from 'listData'
import { DatabaseContext } from 'index';

const emptyNamesList: string[] = []
const emptyList: ListData = {
  _id: "",
  name: "",
  type: ListType.SHOPPING,
  items: []
}

const emptyListNames: string[] = []

export interface ListsProps {
  listData: ListData[]
}

export default (props: ListsProps) => {
  const {listName} = useParams()

  const dbClient = useContext(DatabaseContext)

  const [isOpen, setOpen] = useState(false)
  const [availableLists, setAvailableLists] = useState(emptyListNames)
  const [focusedList, setFocusedList] = useState(emptyList)

  useEffect(() => {
    dbClient.getListNames()
      .then(setAvailableLists)
      .catch(console.error)
  }, [isOpen])

  useEffect(() => {
    const filteredListName = availableLists.filter(name => name === listName)
    if (filteredListName.length === 1 && filteredListName[0] !== "") {
      dbClient.getListByName(filteredListName[0])
        .then(setFocusedList)
        .catch(console.error)
    }
  }, [listName, availableLists])

  const listAppender: (listData: ListData) => Promise<string> = (listData: ListData) => {
    return dbClient.createList(listData)
      .then(rev => {
        availableLists.push(listData.name)
        setAvailableLists({...availableLists})
        return rev
      })
  }

  const toggleDrawer = () => {
    setOpen(!isOpen)
  }

  const closeDrawer = () => {
    setOpen(false)
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
            listNames={availableLists}
            closeDrawer={closeDrawer}
            appendList={listAppender}
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