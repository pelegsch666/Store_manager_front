import { Item } from '../utils/types/types';
import EditModal from './EditModal';
import { useState } from 'react';
import { Button } from '@mui/material';
import AddModal from './AddModal';
import { api } from '../api.index';
import { formatDate } from '../utils/helpers/function';

type Props = {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
};

const ListItems = ({ items, setItems }: Props) => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [addingMode, setAddingMode] = useState<boolean>(false);



  const deleteItem = async (itemId: string) => {

    try {
      await api.items.deleteItem(itemId);

      const updatedItems = await api.items.getAllItems();
      setItems(updatedItems);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <ul>
        {items.map((item, index) => {
    
          return (
            <li key={item._id}>
              <h4>
                {index + 1}. Name:{item.name}
              </h4>
              <h4>Item Description:{item.itemDescription}</h4>
              <h4>Catalog Number:{item.catalogNumber}</h4>
              <h4>Item Type:{item.itemType}</h4>
              <h4>date:{item.date ? formatDate(item.date) : ''}</h4>
              <button onClick={() => deleteItem(item._id)}>Delete</button>
              <button onClick={() => setSelectedItem(item)}>Edit</button>
            </li>
          );
        })}
      </ul>
      <Button onClick={() => setAddingMode(true)}>Add Item</Button>
      {addingMode && (
        <AddModal
          setItems={setItems}
          setAddingMode={setAddingMode}
        />
      )}

      {selectedItem && (
        <EditModal
          setItems={setItems}
          item={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      )}
    </>
  );
};

export default ListItems;
