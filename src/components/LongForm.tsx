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
import Long from '../models/LongModel';
import { eventType } from '../helpers';
import { useOnShowAlert } from '../routes/Root';
import { useState } from 'react';
import ContentWrapper from './ContentWrapper';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const dateTime = dayjs(formData.get('datetime') as string, 'YYYY-MM-DDTHH:mm').toISOString();

  const data: Long = {
    app: 'freelibre',
    eventType: eventType.LONG_ACTING,
    notes: formData.get('notes') as string,
    insulin: +(formData.get('insulin') as string),
    date: dateTime,
  };
  await client.postTreatment(data);
  return redirect('/overview');
}

const LongForm = () => {
  const { onShowAlert } = useOnShowAlert();
  const [dateTime, setDateTime] = useState(dayjs(new Date()).format('YYYY-MM-DDTHH:mm'));

  return (
    <ContentWrapper title='Long'>
      <Form method='post' onSubmit={(e) => onShowAlert('Your Long Treat has been added')}>
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
              name='insulin'
              type='number'
              size='lg'
              startDecorator={<Typography fontSize={'inherit'}>Insulin</Typography>}
              endDecorator={'units'}
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

export default LongForm;
