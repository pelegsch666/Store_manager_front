import { useEffect, useState } from 'react';
import type { Item } from '../utils/types/types';
import { api } from '../api.index';

export const useItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  useEffect(() => {
    const fetchItems = async () => {
      const data = await api.items.getAllItems();

      setItems(data);
    };
    fetchItems();
  }, []);

  return [items, setItems] as const;
};
