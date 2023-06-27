import './App.css';

import ListItems from './components/ListItem';

import Search from './components/Search';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { useItems } from './hooks/useItems';
import { useEffect } from 'react';
import { EventObject } from './utils/types/types';

function App() {
  const [items, setItems] = useItems();
  useEffect(() => {
    const handleTabClose = (event: EventObject) => {
      event.preventDefault();

      return (event.returnValue = 'Are you sure you want to exit?');
    };

    window.addEventListener('beforeunload', handleTabClose);

    return () => {
      window.removeEventListener('beforeunload', handleTabClose);
    };
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: '50px',
      }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <Typography variant="h2">List Items</Typography>
        <ListItems
          items={items}
          setItems={setItems}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <Typography variant="h2"> Search </Typography>
        <Search items={items} />
      </Box>
    </Box>
  );
}

export default App;
