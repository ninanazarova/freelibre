import { FormControl, FormLabel, Input, Textarea, RadioGroup, Radio, Button } from '@mui/joy';

import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/de';
import { useState } from 'react';
import Exercise from '../models/ExerciseModel';

import client from '../api';

const ExerciseForm = () => {
  const [duration, setDuration] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [radio, setRadio] = useState('now');
  const [picker, setPicker] = useState<Date | null>(null);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadio(event.target.value);
  };
  const handlePickerChange = (newValue: Date | null) => {
    setPicker(newValue);
  };
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data: Exercise = {
      app: 'freelibre',
      eventType: 'Exercise',
      duration: duration === '' ? 0 : +duration,
      notes: notes,
      date: picker === null ? new Date().toISOString() : picker?.toISOString(),
    };

    const response = await client.postTreatment(data);
    console.log('hallo from form', response);
  };

  return (
    <form onSubmit={(e) => handleFormSubmit(e)}>
      <FormControl>
        <FormLabel>Duration</FormLabel>
        <Input
          onChange={(event) => setDuration(event.target.value)}
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
          onChange={(event) => setNotes(event.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Event time</FormLabel>
        <RadioGroup
          defaultValue='now'
          name='radio-buttons-group'
          onChange={handleRadioChange}
          orientation='horizontal'
        >
          <Radio value='now' label='Now' />
          <Radio value='other' label='Other' />
        </RadioGroup>
      </FormControl>
      {radio === 'other' && (
        <FormControl>
          <FormLabel>Date and time</FormLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='de'>
            <DateTimePicker
              ampm={false}
              format='DD.MM.YYYY HH:mm'
              value={picker}
              onChange={handlePickerChange}
            />
          </LocalizationProvider>
        </FormControl>
      )}
      <Button type='submit'>Send</Button>
    </form>
  );
};

export default ExerciseForm;
