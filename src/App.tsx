import React, { useEffect, useState } from 'react';
import './App.css';

import { getEntries, getTreatments } from './api';

import CurrentGlucose from './components/CurrentGlucose';
import Entry from './EntryModel';
import Treatment from './TreatmentModel';

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
          <CurrentGlucose sgv={entries[0].sgv} />
        </>
      )}
    </div>
  );
}

export default App;
