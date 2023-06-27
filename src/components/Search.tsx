import { Box } from '@mui/system';
import { Item } from '../utils/types/types';
import { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import axios from 'axios';



type Props = {
  items: Item[]
}



const Search = ({items}:Props) => {
  
  const [currSearchInput, setCurrSearchInput] = useState<string>('');
  const [resultItem, setResultItem] = useState<Item>();
 
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCurrSearchInput(e.target.value);
  };
  

  const filteredItems = items.filter((item) =>  item.name.includes(currSearchInput))

  return (
    <Box>
      <TextField
        inputProps={{
          style: { color: 'white' },
        }}
        placeholder="Search item"
        onChange={handleInputChange}
      />

      <Box>
        {
        currSearchInput !== '' && 
        filteredItems.map((item) => (
           <Box >
            <Typography>{item.name}</Typography>
            <Typography>{item.itemType}</Typography>
            <Typography>{item.itemDescription}</Typography>
            <Typography>{item.catalogNumber}</Typography>
            <Typography>{item.date}</Typography>
           </Box>
        ) )
        }
      </Box>
    </Box>
  );
};

export default Search;
