import axios, { AxiosResponse } from 'axios';
import { Item, ItemToCreate } from './utils/types/types';

axios.defaults.baseURL = 'http://localhost:5150/api';
const responseBody = <T>(res: AxiosResponse<T>) => res.data;

 const items = {
  getAllItems: () => axios.get<Item[]>('/items').then(responseBody),
  addItem: (item: ItemToCreate) => axios.post<ItemToCreate>('/items', item).then(responseBody),
  editItem: (_id: string,item:ItemToCreate) => axios.put(`/items/${_id}`,item).then(responseBody),
  deleteItem: (_id: string) => axios.delete(`/items/${_id}`).then(responseBody),
};
export const api = {items}