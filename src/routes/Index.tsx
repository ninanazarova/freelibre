import { Box, Alert, Snackbar } from '@mui/joy';
import Chart from '../components/Chart';
import CurrentGlucose from '../components/CurrentGlucose';
import RecentTreatments from '../components/RecentTreatments';
import Entry from '../models/EntryModel';
import Treatment from '../models/TreatmentModel';
import { useEffect, useState } from 'react';
import client from '../api';
import { useMessage, useNewId } from '../routes/Root';

const enum Status {
  WAITING = 'waiting',
  LOADING = 'loading',
  DONE = 'done',
}

const Index = () => {
  const [entries, setEntries] = useState<Entry[] | []>([]);
  const [treatments, setTreatments] = useState<Treatment[] | []>([]);
  const [status, setStatus] = useState(Status.WAITING);
  const [open, setOpen] = useState(false);
  const { message } = useMessage();
  const { id } = useNewId();

  const getNewTreatment = async (id: string) => {
    try {
      setStatus(Status.LOADING);
      const treatment = await client.getTreatment(id);
      if (treatment !== null) {
        //TODO: insert by datetime instead of push to the top
        setTreatments((ts) => [treatment, ...ts]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setStatus(Status.DONE);
    }
  };

  useEffect(() => {
    if (message !== null) setOpen(true);
    if (id !== null) getNewTreatment(id);
  }, [message, id]);

  useEffect(() => {
    const fetchDataOnLoad = async () => {
      try {
        setStatus(Status.LOADING);
        const entries = await client.getEntries();
        const treatments = await client.getTreatments();

        setEntries(entries);
        setTreatments(treatments);
      } catch (error) {
        console.error(error);
      } finally {
        setStatus(Status.DONE);
      }
    };

    fetchDataOnLoad();
  }, []);

  const lastEntry = entries[entries.length - 1];
  return (
    <>
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

      {status === Status.LOADING && <span>loading...</span>}
      {status === Status.DONE && (
        <Box minHeight={'100vh'} pb={'82px'} bgcolor={'#f3f2f8'}>
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
    </>
  );
};

export default Index;
