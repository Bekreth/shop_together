import Box from '@mui/material/Box';

interface ListData {
  _id: string
  _rev: string
  name: string
}

const sampleData: ListData[] = [
  {
    _id: "abcdef",
    _rev: "32_abcdef",
    name: "primary shopping"
  },
  {
    _id: "123456",
    _rev: "91_njanjag",
    name: "secondary list"
  },
  {
    _id: "819851",
    _rev: "31_notReal",
    name: "one more"
  }
]

export default () => {
  return (
    <Box>
    </Box>
  )
}

const ShoppingList = (list: ListData) => {
  return (
    <Box>
    
    </Box>
  )
}