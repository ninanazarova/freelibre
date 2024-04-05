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

import dayjs from 'dayjs';
import client from '../api';
import Meal from '../models/MealModel';
import { eventType } from '../models/TreatmentModel';
import { useOnShowAlert } from '../routes/Root';
import { useState } from 'react';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const dateTime = dayjs(formData.get('datetime') as string, 'YYYY-MM-DDTHH:mm').toISOString();

  const data: Meal = {
    app: 'freelibre',
    eventType: eventType.MEAL,
    carbs: +(formData.get('carbs') as string),
    protein: +(formData.get('protein') as string),
    fat: +(formData.get('fat') as string),
    insulin: +(formData.get('insulin') as string),
    preBolus: +(formData.get('preBolus') as string),
    notes: formData.get('notes') as string,
    date: dateTime,
  };
  await client.postTreatment(data);
  return redirect('/overview');
}

const MealForm = () => {
  const { onShowAlert } = useOnShowAlert();
  const [dateTime, setDateTime] = useState(dayjs(new Date()).format('YYYY-MM-DDTHH:mm'));

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
              startDecorator={<Typography fontSize={'inherit'}>Carbs</Typography>}
              endDecorator={'g'}
              slotProps={{ input: { inputMode: 'numeric', pattern: '[0-9]*' } }}
            />
          </FormControl>
          <FormControl>
            <Input
              name='insulin'
              type='number'
              size='lg'
              startDecorator={<Typography fontSize={'inherit'}>Insulin</Typography>}
              endDecorator={'units'}
              slotProps={{ input: { inputMode: 'numeric', pattern: '[0-9]*' } }}
            />
          </FormControl>
          <FormControl>
            <Input
              name='preBolus'
              type='number'
              size='lg'
              startDecorator={<Typography fontSize={'inherit'}>Pre-Bolus</Typography>}
              endDecorator={'min'}
              slotProps={{ input: { inputMode: 'numeric', pattern: '[0-9]*' } }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Date and time</FormLabel>
            <Input
              name='datetime'
              type='datetime-local'
              size='lg'
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
            />
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
