import { useState } from 'react';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

import { Item } from 'listData'

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


export interface EditItemProps {
  item: Item
  saveItemEdits: (originalItemName: string, item: Item) => void
  isOpen: boolean
  close: () => void
}

export default (props: EditItemProps) => {
  const {item, saveItemEdits, isOpen, close} = props

  const [itemName, setItemName] = useState(item.name)
  const [itemState, setItemState] = useState(item.state)

  return (
    <Modal
      open={isOpen}
      onClose={close} 
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h5">
          Editing Item : {item.name}
        </Typography>
        <br/>
        <TextField
          id="itemName"
          label="Item Name"
          variant="outlined"
          defaultValue={item.name}
          onChange={event => setItemName(event.target.value)}
        />
        <br/>
        <Button
          variant="contained"
          onClick={() => {
            const newItem: Item = {
              _id: item._id,
              _rev: item._rev,
              name: itemName,
              state: itemState,
              created: item.created,
              updated: new Date(),
            }
            console.log(newItem)
            saveItemEdits(item.name, newItem)
            close()
          }}
        >
          Update Item
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