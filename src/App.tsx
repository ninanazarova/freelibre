import React, { useEffect, useState } from 'react';
import './App.css';

import { getEntries, getTreatments } from './api';

import CurrentGlucose from './components/CurrentGlucose';
import Entry from './EntryModel';
import Treatment from './TreatmentModel';
import Chart from './components/Chart';
import { calculate } from './helpers';

function App() {
  const [entries, setEntries] = useState<Entry[] | []>([]);
  const [treatments, setTreatments] = useState<Treatment[] | null>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDataOnLoad = async () => {
      try {
        const entries = await getEntries();
        const treatments = await getTreatments();
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

  return (
    <div className='App'>
      {!isLoading && entries.length !== 0 && (
        <>
          <CurrentGlucose sgv={calculate(entries[entries.length - 1].sgv)} />
          <Chart dataset={entries} />
        </>
      )}
    </div>
  );
}

export default App;
