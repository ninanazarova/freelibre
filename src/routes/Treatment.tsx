import { Box, Card, Typography } from '@mui/joy';
import client from '../api';
import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import TreatmentModel from '../models/TreatmentModel';
import Chart from '../components/Chart';
import Entry from '../models/EntryModel';
import TimeControls from '../components/TimeControls';
import dayjs from 'dayjs';
import RecentTreatments from '../components/RecentTreatments';
import { sgvToMbg } from '../helpers';

export async function loader({ params }: LoaderFunctionArgs) {
  const treatment = await client.getTreatment(params.treatmentId as string);
  if (treatment === null) {
    return;
  }
  const entries = await client.getEntriesForTreatment(treatment.date);
  const treatments = await client.getTreatmentsForTreatment(treatment.date);
  return { treatment, entries, treatments };
}
type LoaderData = {
  treatment: TreatmentModel;
  entries: Entry[];
  treatments: TreatmentModel[];
};
const Treatment = () => {
  const { treatment, entries, treatments } = useLoaderData() as LoaderData;
  return (
    <Box>
      {entries.length && (
        <>
          <TimeControls />
          <Chart
            treatment={treatment}
            treatments={treatments.slice().reverse()}
            entries={entries}
          />
          <Card variant='plain' sx={{ mx: 3, mt: 3 }}>
            <Typography>{dayjs(treatment.date).format('DD.MM.YYYY HH:mm')}</Typography>
            <Typography>{treatment.notes}</Typography>
            <Typography>Carbs: {treatment.carbs}</Typography>
            <Typography>Insulin: {treatment.insulin}</Typography>
            {treatment.freelibre_sgv && (
              <Typography>
                {sgvToMbg(treatment.freelibre_sgv)} → {sgvToMbg(treatment.freelibre_sgv_2h)}
              </Typography>
            )}
          </Card>

          <RecentTreatments treatments={treatments.slice().reverse()} />
        </>
      )}
    </Box>
  );
};

export default Treatment;
