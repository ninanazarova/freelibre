import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Stack,
  inputClasses,
  Typography,
  textareaClasses,
} from '@mui/joy';

import { ActionFunctionArgs, Form, redirect } from 'react-router-dom';
import dayjs from 'dayjs';
import client from '../api';
import Exercise from '../models/ExerciseModel';
import { eventType } from '../helpers';
import { useOnShowAlert } from '../routes/Root';
import { useState } from 'react';
import ContentWrapper from './ContentWrapper';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const dateTime = dayjs(formData.get('datetime') as string, 'YYYY-MM-DDTHH:mm').toISOString();
  const duration = formData.get('duration');

  const data: Exercise = {
    app: 'freelibre',
    eventType: eventType.EXERCISE,
    duration: duration === '' ? 0 : +(duration as string),
    notes: formData.get('notes') as string,
    date: dateTime,
  };
  await client.postTreatment(data);
  return redirect('/overview');
}

const ExerciseForm = () => {
  const { onShowAlert } = useOnShowAlert();
  const [dateTime, setDateTime] = useState(dayjs(new Date()).format('YYYY-MM-DDTHH:mm'));

  return (
    <ContentWrapper title='Exercise'>
      <Form method='post' onSubmit={(e) => onShowAlert('Your Exercise has been added')}>
        <Stack
          spacing={2}
          sx={{
            [`& .${inputClasses.root}`]: {
              '--Input-focusedThickness': '1px',
            },
            [`& .${textareaClasses.root}`]: {
              '--Textarea-focusedThickness': '1px',
            },
          }}
        >
          <FormControl>
            <Input
              name='duration'
              type='number'
              size='lg'
              startDecorator={<Typography fontSize={'inherit'}>Duration</Typography>}
              endDecorator={'min'}
              slotProps={{ input: { inputMode: 'numeric', pattern: '[0-9]*' } }}
              required
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
              required
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
    </ContentWrapper>
  );
};

export default ExerciseForm;
