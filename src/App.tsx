import React, { useEffect, useState } from 'react';

import client from './api';

import CurrentGlucose from './components/CurrentGlucose';
import Entry from './models/EntryModel';
import Chart from './components/Chart';
import TreatmentMenu from './components/TreatmentMenu';
import Alert from '@mui/joy/Alert';
import { Snackbar } from '@mui/joy';

function App() {
  const [entries, setEntries] = useState<Entry[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleShowAlert = (message: string) => {
    setOpen(true);
    setMessage(message);
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

  return (
    <div>
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
        <>
          {entries.length === 0 ? (
            <Alert color='danger' size='lg' variant='soft'>
              We don't get any data, sorry :(
            </Alert>
          ) : (
            <>
              <CurrentGlucose sgv={entries[entries.length - 1].sgv} />
              <Chart dataset={entries} />
            </>
          )}
          <TreatmentMenu onShowAlert={handleShowAlert} />
        </>
      )}
    </div>
  );
}

export default App;
