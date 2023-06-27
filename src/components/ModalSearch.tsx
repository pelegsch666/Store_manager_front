import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Item } from '../utils/types/types';

type Props = {
  item: Item;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const ModalSearch = ({ open,setOpen,item }: Props) => {
   

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box>
          <ul>
            <li key={item._id}>
              <h4>Name:{item.name}</h4>
              <h4>itemDescription:{item.itemDescription}</h4>
              <h4>catalogNumber:{item.catalogNumber}</h4>
              <h4>itemType:{item.itemType}</h4>
              <h4>date:{item.date}</h4>
            </li>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </ul>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalSearch;
