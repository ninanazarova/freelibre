import { FormControl, FormLabel, Input, Textarea, RadioGroup, Radio, Button } from '@mui/joy';

import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/de';
import { useState } from 'react';
import Exercise from '../models/ExerciseModel';

import client from '../api';

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
      eventType: 'Exercise',
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
      <FormControl>
        <FormLabel>Notes</FormLabel>
        <Textarea
          placeholder='Anything about your exercise moments'
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </FormControl>
      <FormControl>
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
      <Button loading={isLoading} type='submit'>
        Send
      </Button>
    </form>
  );
};

export default ExerciseForm;
