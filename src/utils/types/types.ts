export type Item = {
  _id: string;
  name: string;
  catalogNumber: number;
  itemDescription: string;
  itemType: ItemType;
  date: Date;
};

export type ItemToCreate = Omit<Item,'_id'>

export type EventObject = {
  preventDefault: () => void;
  returnValue: string;
};

export type Key =
  | 'name'
  | 'catalogNumber'
  | 'itemDescription'
  | 'itemType'
  | 'date';

export type ItemType = 'vegetable' | 'fruit' | 'field crop';
