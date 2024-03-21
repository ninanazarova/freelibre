import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Typography,
  Stack,
  inputClasses,
  textareaClasses,
} from '@mui/joy';

import { ActionFunctionArgs, Form, redirect } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/de';
import client from '../api';
import Meal from '../models/MealModel';
import { eventType } from '../models/TreatmentModel';
import { useOnShowAlert } from '../routes/Root';
import { useState } from 'react';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const dateIsNow = formData.get('isNow');

  const data: Meal = {
    app: 'freelibre',
    eventType: eventType.MEAL,
    carbs: +(formData.get('carbs') as string),
    protein: +(formData.get('protein') as string),
    fat: +(formData.get('fat') as string),
    insulin: +(formData.get('insulin') as string),
    preBolus: +(formData.get('preBolus') as string),
    notes: formData.get('notes') as string,
    date:
      dateIsNow === 'now'
        ? new Date().toISOString()
        : dayjs(formData.get('datetime') as string, 'DD.MM.YYYY HH:mm').toISOString(),
  };
  await client.postTreatment(data);
  return redirect('/');
}

const MealForm = () => {
  const { onShowAlert } = useOnShowAlert();
  const [dateTime, setDateTime] = useState(new Date().toISOString());

  return (
    <Stack direction='column' spacing={3} sx={{ px: 3, mt: 6 }}>
      <Typography level='h2'>Meal</Typography>
      <Form method='post' onSubmit={(e) => onShowAlert('Your meal has been added succesfully')}>
        <Stack
          spacing={2}
          sx={{
            [`& .${inputClasses.root}`]: {
              '--Input-focusedThickness': '1px',
            },
            [`& .${inputClasses.input}`]: {
              width: '100%',
            },
            [`& .${textareaClasses.root}`]: {
              '--Textarea-focusedThickness': '1px',
            },
          }}
        >
          <FormControl>
            <Input
              name='carbs'
              type='number'
              size='lg'
              startDecorator={<Typography>Carbs</Typography>}
              endDecorator={'g'}
              slotProps={{ input: { inputMode: 'numeric', pattern: '[0-9]*' } }}
            />
          </FormControl>
          <FormControl>
            <Input
              name='insulin'
              type='number'
              size='lg'
              startDecorator={<Typography>Insulin</Typography>}
              endDecorator={'units'}
              slotProps={{ input: { inputMode: 'numeric', pattern: '[0-9]*' } }}
            />
          </FormControl>
          <FormControl>
            <Input
              name='preBolus'
              type='number'
              size='lg'
              startDecorator={<Typography>Pre-Bolus</Typography>}
              endDecorator={'min'}
              slotProps={{ input: { inputMode: 'numeric', pattern: '[0-9]*' } }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Date and time</FormLabel>
            <LocalizationProvider adapterLocale='de' dateAdapter={AdapterDayjs}>
              <Input name='datetime' type='datetime-local' size='lg' defaultValue={dateTime} />
            </LocalizationProvider>
          </FormControl>

          <FormControl>
            <FormLabel>Notes</FormLabel>
            <Textarea size='lg' minRows={2} placeholder='Additional comments' name='notes' />
          </FormControl>

          <Button size='lg' type='submit'>
            Send
          </Button>
        </Stack>
      </Form>
    </Stack>
  );
};

export default MealForm;
