import axios, { AxiosResponse } from 'axios';
import { Item, ItemToCreate } from './utils/types/types';

axios.defaults.baseURL = 'http://localhost:5150/api';
const responseBody = <T>(res: AxiosResponse<T>) => res.data;

 const items = {
  getAllItems: () => axios.get<Item[]>('/items').then(responseBody),
  addItem: (item: ItemToCreate) => axios.post<ItemToCreate>('/items', item).then(responseBody),
  editItem: (item: Item) => axios.put(`${item._id}`).then(responseBody),
  deleteItem: (_id: string) => axios.delete(`/${_id}`).then(responseBody),
};
export const api = {items}