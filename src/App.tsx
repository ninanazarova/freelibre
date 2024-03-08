import React, { StrictMode, useEffect, useState } from 'react';
import { Alert, Box, Snackbar } from '@mui/joy';

import client from './api';
import Entry from './models/EntryModel';
import Chart from './components/Chart';
import CurrentGlucose from './components/CurrentGlucose';
import RecentTreatments from './components/RecentTreatments';
import BottomNavigation from './components/BottomNavigation';
import Treatment from './models/TreatmentModel';

function App() {
  const [entries, setEntries] = useState<Entry[] | []>([]);
  const [treatments, setTreatments] = useState<Treatment[] | []>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const getNewTreatment = async (id: string) => {
    try {
      setIsLoading(true);
      const treatment = await client.getTreatment(id);
      if (treatment !== null) {
        //TODO: insert by datetime instead of push to the top
        setTreatments((ts) => [treatment, ...ts]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleShowAlert = (message: string, id: string) => {
    setOpen(true);
    setMessage(message);
    getNewTreatment(id);
  };

  useEffect(() => {
    const fetchDataOnLoad = async () => {
      try {
        const entries = await client.getEntries();
        const treatments = await client.getTreatments();

        setEntries(entries);
        setTreatments(treatments);
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
              <Chart treatments={treatments.slice().reverse()} entries={entries} />
              <RecentTreatments treatments={treatments} />
            </>
          )}
        </Box>
      )}
      <BottomNavigation onShowAlert={handleShowAlert} />
    </StrictMode>
  );
}

export default App;
