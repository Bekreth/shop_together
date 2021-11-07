import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

import {ListData, makeList} from './ListData';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export interface CreateListProps {
    isOpen: boolean
    close: () => void
    addList: (newList: ListData) => void
}

export default (props: CreateListProps) => {
  const {isOpen, close, addList} = props
  const [listName, setListName] = React.useState("")

  return (
    <Modal
      open={isOpen}
      onClose={close}
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h4" component="h2">
          New List
        </Typography>
        <TextField
          id="listName" 
          label="List Name"
          variant="outlined"
          onChange={event => {
            setListName(event.target.value)
          }}
        />
        <br/>
        <Button
          variant="contained"
          onClick={() => {
            const newList: ListData = makeList(listName)
            addList(newList)
            close()
          }}
        >
          Create
        </Button>
        <Button
          variant="outlined"
          onClick={close}
        >
          Cancel
        </Button>
      </Box>
    </Modal>
  )
}