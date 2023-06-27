import {
  Box,
  Button,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { Item, ItemToCreate, ItemType } from '../utils/types/types';
import { useState } from 'react';
import { arrangeDate, isWholeNumberOrZero } from '../utils/helpers/function';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { api } from '../api.index';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
type Props = {
  setItems: (items: Item[]) => void;
  setAddingMode: (addingMode: boolean) => void;
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AddModal = ({ setItems, setAddingMode }: Props) => {
  const [newItem, setNewItem] = useState<ItemToCreate>({
    name: '',
    itemDescription: '',
    itemType: 'fruit',
    date: arrangeDate(),
    catalogNumber: 0,
  });

  const handleChange = (
    key: keyof ItemToCreate,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (key === 'catalogNumber') {
      if (!isWholeNumberOrZero(+e.target.value)) {
        alert('catalog number must be a whole number');
        return;
      }
    }

    if (key === 'name') {
      if (e.target.value.length > 50) {
        alert('name must be less than 50 characters');
        return;
      }
    }

    setNewItem({ ...newItem, [key]: e.target.value });
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    setNewItem({ ...newItem, itemType: e.target.value as ItemType });
  };

  const handleAddItem = async () => {
    try {
      await api.items.addItem(newItem);
      const updatedItems = await api.items.getAllItems();
      setItems(updatedItems);
      setAddingMode(false);
      alert('Adding successful');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Modal open={true}>
      <Box sx={style}>
        <TextField
          defaultValue={''}
          label="name"
          onChange={e => handleChange('name', e)}
          placeholder="limited to 50 characters"
          required
        />
        <TextField
          defaultValue={0}
          type="number"
          label="catalog number"
          onChange={e => handleChange('catalogNumber', e)}
          required
        />

        <TextField
          multiline
          maxRows={4}
          defaultValue={'item description'}
          onChange={e => handleChange('itemDescription', e)}
        />

        <Select
          onChange={handleSelectChange}
          value={newItem.itemType}
          label={'Item Type'}>
          <MenuItem value={'fruit'}>Fruit</MenuItem>
          <MenuItem value={'vegetable'}>Vegetable</MenuItem>
          <MenuItem value={'field crop'}>Field Crop</MenuItem>
        </Select>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            onChange={val => setNewItem({ ...newItem, date: val as Date })}
          />
        </LocalizationProvider>
        <Button onClick={handleAddItem}>Add Item</Button>
        <Button
          onClick={() => {
            setAddingMode(false);
          }}>
          Exit
        </Button>
      </Box>
    </Modal>
  );
};

export default AddModal;
