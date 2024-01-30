import React, { useEffect, useState } from 'react';
import './App.css';

import client from './api';

import CurrentGlucose from './components/CurrentGlucose';
import Entry from './EntryModel';
import Chart from './components/Chart';
import AddTreatmentButton from './components/AddTreatmentButton';

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
    <div className='App'>
      {!isLoading && entries.length !== 0 && (
        <>
          <CurrentGlucose sgv={entries[entries.length - 1].sgv} />
          <Chart dataset={entries} />
          <AddTreatmentButton />
        </>
      )}
    </div>
  );
}

export default App;
