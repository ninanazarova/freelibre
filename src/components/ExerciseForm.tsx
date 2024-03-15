import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  RadioGroup,
  Radio,
  Button,
  Stack,
} from '@mui/joy';

import { ActionFunctionArgs, Form, redirect } from 'react-router-dom';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/de';
import dayjs from 'dayjs';
import client from '../api';
import Exercise from '../models/ExerciseModel';
import { eventType } from '../models/TreatmentModel';
import { useOnShowAlert } from '../routes/Root';
import { useState } from 'react';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const dateIsNow = formData.get('isNow');
  const duration = formData.get('duration');

  const data: Exercise = {
    app: 'freelibre',
    eventType: eventType.EXERCISE,
    duration: duration === '' ? 0 : +(duration as string),
    notes: formData.get('notes') as string,
    date:
      dateIsNow === 'now'
        ? new Date().toISOString()
        : dayjs(formData.get('datetime') as string, 'DD.MM.YYYY HH:mm').toISOString(),
  };
  await client.postTreatment(data);
  return redirect('/');
}

const ExerciseForm = () => {
  const [radio, setRadio] = useState('now');
  const { onShowAlert } = useOnShowAlert();

  return (
    <Form method='post' onSubmit={(e) => onShowAlert('Your exercise has been added successfully')}>
      <Stack direction='column' justifyContent='center' alignItems='start' spacing={2}>
        <FormControl>
          <FormLabel>Duration</FormLabel>
          <Input
            placeholder='In minutes'
            slotProps={{ input: { inputMode: 'numeric', pattern: '[0-9]*' } }}
            type='number'
            name='duration'
          />
        </FormControl>
        <FormControl>
          <FormLabel>Notes</FormLabel>
          <Textarea
            minRows={2}
            placeholder='Anything about your exercise moments...'
            name='notes'
          />
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

export default ExerciseForm;
