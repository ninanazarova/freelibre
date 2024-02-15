import { FormControl, FormLabel, Input, Textarea, RadioGroup, Radio, Button, Box } from '@mui/joy';

import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/de';
import { useState } from 'react';
import Exercise from '../models/ExerciseModel';

import client from '../api';
import { eventType } from '../models/TreatmentModel';

type Props = {
  onCloseForm: (message: string) => void;
};

const ExerciseForm = ({ onCloseForm }: Props) => {
  const [duration, setDuration] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [radio, setRadio] = useState('now');
  const [picker, setPicker] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data: Exercise = {
      app: 'freelibre',
      eventType: eventType.EXERCISE,
      duration: duration === '' ? 0 : +duration,
      notes: notes,
      date: picker === null ? new Date().toISOString() : picker?.toISOString(),
    };

    try {
      setIsLoading(true);
      const response = await client.postTreatment(data);
      console.log(response);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
      onCloseForm('Your exercise was added successfully!!!');
    }
  };

  return (
    <form onSubmit={(e) => handleFormSubmit(e)}>
      <FormControl>
        <FormLabel>Duration</FormLabel>
        <Input
          onChange={(e) => setDuration(e.target.value)}
          placeholder='In minutes'
          slotProps={{ input: { inputMode: 'numeric', pattern: '[0-9]*' } }}
          type='number'
          value={duration}
        />
      </FormControl>
      <FormControl sx={{ mt: 2 }}>
        <FormLabel>Notes</FormLabel>
        <Textarea
          minRows={2}
          placeholder='Anything about your exercise moments...'
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </FormControl>
      <FormControl sx={{ mt: 2 }}>
        <FormLabel>Event time</FormLabel>
        <RadioGroup
          defaultValue='now'
          name='radio-buttons-group'
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
            <DateTimePicker
              ampm={false}
              format='DD.MM.YYYY HH:mm'
              value={picker}
              onChange={(newValue) => setPicker(newValue)}
            />
          </LocalizationProvider>
        </FormControl>
      )}
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button loading={isLoading} type='submit'>
          Send
        </Button>
      </Box>
    </form>
  );
};

export default ExerciseForm;
