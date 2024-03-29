import { Stack, Typography } from '@mui/joy';
import client from '../api';
import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import TreatmentModel from '../models/TreatmentModel';

export async function loader({ params }: LoaderFunctionArgs) {
  const treatment = await client.getTreatment(params.treatmentId as string);
  return { treatment };
}
type LoaderData = {
  treatment: TreatmentModel;
};
const Treatment = () => {
  const { treatment } = useLoaderData() as LoaderData;
  return (
    <Stack direction='column' spacing={3} sx={{ px: 3, mt: 6 }}>
      <Typography level='h2'>Treatment</Typography>
      <Typography level='body-lg'>id: {treatment.identifier}</Typography>
      <Typography level='body-lg'>Notes: {treatment.notes}</Typography>
    </Stack>
  );
};

export default Treatment;
