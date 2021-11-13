import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

import {ListData, makeList} from 'listData';

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
  appendList: (listData: ListData) => Promise<string>
}

export default (props: CreateListProps) => {
  const {isOpen, close, appendList} = props
  const [listName, setListName] = useState("")
  const [insertionError, setInsertionError] = useState(false)

  return (
    <Modal
      open={isOpen}
      onClose={close}
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h4">
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
            appendList(makeList(listName))
              .then(rev => close())
              .catch(error => (
                console.error("failed to insert", error)
              ))
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