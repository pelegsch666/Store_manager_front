import {
  Box,
  Button,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { Item, ItemType } from '../utils/types/types';
import { useState } from 'react';

import { api } from '../api.index';

type Props = {
  item: Item;
  setSelectedItem: (item: Item | null) => void;
  setItems: (items: Item[]) => void;
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

const EditModal = ({ item, setSelectedItem, setItems }: Props) => {
  const [editItem, setEditItem] = useState<Item>(item);

  const handleSelectChange = (e: SelectChangeEvent) => {
    setEditItem(state => {
      const itemType = e.target.value as ItemType;
      return { ...state, itemType };
    });
  };

  const handleChange = (
    key: keyof Item,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditItem({ ...editItem, [key]: e.target.value });
  };
  const handleSubmit = async () => {
    try {
      await api.items.editItem(editItem._id, editItem);
      const items = await api.items.getAllItems();
      setItems(items);
    } catch (error) {
      alert(error);
    }
    setSelectedItem(null);
  };

  return (
    <Modal open={true}>
      <Box sx={style}>
        <TextField
          defaultValue={item.name}
          label="name"
          onChange={e => handleChange('name', e)}
        />
        <TextField
          defaultValue={item.catalogNumber}
          label="catalog number"
          onChange={e => handleChange('catalogNumber', e)}
        />
        <TextField
          defaultValue={item.itemDescription}
          label="item description"
          onChange={e => handleChange('itemDescription', e)}
        />

        <Select
          onChange={handleSelectChange}
          value={item.itemType}
          label={'Item Type'}>
          <MenuItem value={'fruit'}>Fruit</MenuItem>
          <MenuItem value={'vegetable'}>Vegetable</MenuItem>
          <MenuItem value={'field corp'}>Field Corp</MenuItem>
        </Select>
        <TextField
          defaultValue={item.itemType}
          label="item type"
          onChange={e => handleChange('itemType', e)}
        />
        <TextField
          defaultValue={item.date}
          label="date"
          type="date"
          onChange={e => handleChange('date', e)}
        />
        <Button onClick={handleSubmit}>Submit</Button>
        <Button
          onClick={() => {
            setSelectedItem(null);
          }}>
          Exit
        </Button>
      </Box>
    </Modal>
  );
};

export default EditModal;
