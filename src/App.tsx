import React, { StrictMode, useEffect, useState } from 'react';
import { Alert, Box, Snackbar } from '@mui/joy';

import client from './api';
import Entry from './models/EntryModel';
import Chart from './components/Chart';
import CurrentGlucose from './components/CurrentGlucose';
import RecentTreatments from './components/RecentTreatments';
import BottomNavigation from './components/BottomNavigation';

function App() {
  const [entries, setEntries] = useState<Entry[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [id, setId] = useState<null | string>(null);

  const handleShowAlert = (message: string, id: string) => {
    setOpen(true);
    setMessage(message);
    setId(id);
  };

  useEffect(() => {
    const fetchDataOnLoad = async () => {
      try {
        const entries = await client.getEntries();

        setEntries(entries);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataOnLoad();
  }, []);

  const lastEntry = entries[entries.length - 1];

  return (
    <StrictMode>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={3000}
        color='primary'
        open={open}
        onClose={() => setOpen(false)}
        size='md'
        variant='soft'
      >
        {message}
      </Snackbar>

      {!isLoading && (
        <Box minHeight={'100vh'} pb={'82px'}>
          {entries.length === 0 ? (
            <Alert color='danger' size='lg' variant='soft'>
              We don't get any data, sorry :(
            </Alert>
          ) : (
            <>
              <CurrentGlucose direction={lastEntry.direction} mbg={lastEntry.mbg as number} />
              <Chart dataset={entries} />
            </>
          )}
          <RecentTreatments id={id} />
        </Box>
      )}
      <BottomNavigation onShowAlert={handleShowAlert} />
    </StrictMode>
  );
}

export default App;
