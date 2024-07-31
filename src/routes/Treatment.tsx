import { Box, Typography } from '@mui/joy';
import { getGlobalClient } from '../api';
import dayjs from 'dayjs';
import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import TreatmentModel from '../models/TreatmentModel';
import Entry from '../models/EntryModel';
import Chart from '../components/Chart';
import ContentWrapper from '../components/ContentWrapper';
import TreatmentCard from '../components/TreatmentCard';

export async function loader({ params }: LoaderFunctionArgs) {
  const client = getGlobalClient();
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
  const reversedTreatments = treatments.slice().reverse();
  return (
    <Box>
      {entries.length && (
        <>
          <ContentWrapper>
            <Typography level='h4' fontWeight={700} mb={1}>
              {dayjs(treatment.date).format('DD MMM YYYY')}
            </Typography>
          </ContentWrapper>
          <Chart treatment={treatment} treatments={reversedTreatments} entries={entries} />
          <ContentWrapper>
            {reversedTreatments.map((treat) => (
              <TreatmentCard treat={treat} key={treat.identifier} />
            ))}
          </ContentWrapper>
        </>
      )}
    </Box>
  );
};

export default Treatment;
