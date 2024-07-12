import { Box, Alert } from '@mui/joy';
import Chart from '../components/Chart';
import CurrentGlucose from '../components/CurrentGlucose';
import RecentTreatments from '../components/RecentTreatments';
import Entry from '../models/EntryModel';
import Treatment from '../models/TreatmentModel';
import client from '../api';
import { useLoaderData } from 'react-router-dom';
import ContentWrapper from '../components/ContentWrapper';

export async function loader() {
  const result = await client.authorize();
  if (result === null) {
    return { entries: [], treatments: [] };
  }

  const entries = await client.getEntries();
  const treatments = await client.getTreatments();
  return { entries, treatments };
}
type EntriesAndTreatments = {
  entries: Entry[] | [];
  treatments: Treatment[] | [];
};

const Overview = () => {
  const { entries, treatments } = useLoaderData() as EntriesAndTreatments;

  const lastEntry = entries[entries.length - 1];

  return (
    <Box>
      {entries.length ? (
        <>
          <CurrentGlucose direction={lastEntry.direction} mbg={lastEntry.mbg as number} />
          <Chart treatments={treatments.slice().reverse()} entries={entries} />

          <ContentWrapper>
            <RecentTreatments treatments={treatments} />
          </ContentWrapper>
        </>
      ) : (
        <Alert color='danger' size='lg' variant='soft'>
          There's no entries
        </Alert>
      )}
    </Box>
  );
};

export default Overview;
