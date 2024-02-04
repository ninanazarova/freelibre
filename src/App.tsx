import React, { useEffect, useState } from 'react';

import client from './api';

import CurrentGlucose from './components/CurrentGlucose';
import Entry from './EntryModel';
import Chart from './components/Chart';
import TreatmentMenu from './components/TreatmentMenu';
import Alert from '@mui/joy/Alert';

function App() {
  const [entries, setEntries] = useState<Entry[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);

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
              <TreatmentMenu />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
