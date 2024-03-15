import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  RadioGroup,
  Radio,
  Button,
  Typography,
  Divider,
  Stack,
} from '@mui/joy';

import { ActionFunctionArgs, Form, redirect } from 'react-router-dom';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
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
  const [radio, setRadio] = useState('now');
  const { onShowAlert } = useOnShowAlert();

  return (
    <Form method='post' onSubmit={(e) => onShowAlert('Your meal has been added succesfully')}>
      <Stack direction='column' justifyContent='center' alignItems='start' spacing={2}>
        <FormControl>
          <Input
            slotProps={{ input: { inputMode: 'numeric', pattern: '[0-9]*' } }}
            startDecorator={
              <>
                <Typography>Carbs</Typography>
                <Divider orientation='vertical' sx={{ ml: 1.5 }} />
              </>
            }
            endDecorator={'g'}
            type='number'
            name='carbs'
          />
        </FormControl>
        <FormControl>
          <Input
            slotProps={{ input: { inputMode: 'numeric', pattern: '[0-9]*' } }}
            startDecorator={
              <>
                <Typography>Protein</Typography>
                <Divider orientation='vertical' sx={{ ml: 1.5 }} />
              </>
            }
            endDecorator={'g'}
            type='number'
            name='protein'
          />
        </FormControl>
        <FormControl>
          <Input
            slotProps={{ input: { inputMode: 'numeric', pattern: '[0-9]*' } }}
            startDecorator={
              <>
                <Typography>Fat</Typography>
                <Divider orientation='vertical' sx={{ ml: 1.5 }} />
              </>
            }
            endDecorator={'g'}
            type='number'
            name='fat'
          />
        </FormControl>

        <FormControl>
          <FormLabel>Insulin</FormLabel>
          <Input
            endDecorator={'mmol'}
            slotProps={{ input: { inputMode: 'numeric', pattern: '[0-9]*' } }}
            type='number'
            name='insulin'
          />
        </FormControl>
        <FormControl>
          <Input
            slotProps={{ input: { inputMode: 'numeric', pattern: '[0-9]*' } }}
            startDecorator={
              <>
                <Typography>Pre-Bolus</Typography>
                <Divider orientation='vertical' sx={{ ml: 1.5 }} />
              </>
            }
            endDecorator={'min'}
            type='number'
            name='preBolus'
          />
        </FormControl>
        <FormControl>
          <FormLabel>Notes</FormLabel>
          <Textarea minRows={2} placeholder='Additional comments' name='notes' />
        </FormControl>
        <FormControl>
          <FormLabel>Event time</FormLabel>
          <RadioGroup
            defaultValue='now'
            name='isNow'
            onChange={(e) => setRadio(e.target.value)}
            orientation='horizontal'
          >
            <Radio value='now' label='Now' />
            <Radio value='other' label='Other' />
          </RadioGroup>
        </FormControl>
        {radio === 'other' && (
          <FormControl>
            <FormLabel>Date and time</FormLabel>
            <LocalizationProvider adapterLocale='de' dateAdapter={AdapterDayjs}>
              <DateTimePicker ampm={false} format='DD.MM.YYYY HH:mm' name='datetime' />
            </LocalizationProvider>
          </FormControl>
        )}

        <Button type='submit'>Send</Button>
      </Stack>
    </Form>
  );
};

export default MealForm;
