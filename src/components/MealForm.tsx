import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  RadioGroup,
  Radio,
  Button,
  Box,
  Typography,
  Divider,
} from '@mui/joy';

import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/de';
import { useState } from 'react';
import Meal from '../models/MealModel';

import client from '../api';
import { eventType } from '../models/TreatmentModel';

type Props = {
  onCloseForm: (message: string, id: string) => void;
};

const MealForm = ({ onCloseForm }: Props) => {
  const [glucose, setGlucose] = useState('');
  const [carbs, setCarbs] = useState('');
  const [protein, setProtein] = useState('');
  const [fat, setFat] = useState('');
  const [insulin, setInsulin] = useState('');
  const [preBolus, setPreBolus] = useState('');
  const [notes, setNotes] = useState('');
  const [radio, setRadio] = useState('now');
  const [picker, setPicker] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data: Meal = {
      app: 'freelibre',
      eventType: eventType.MEAL,
      glucose: glucose,
      carbs: +carbs,
      protein: +protein,
      fat: +fat,
      insulin: +insulin,
      preBolus: +preBolus,
      notes: notes,
      date: picker === null ? new Date().toISOString() : picker?.toISOString(),
    };

    try {
      setIsLoading(true);
      const response = await client.postTreatment(data);
      console.log(response);
      if (response !== undefined && response.identifier) {
        onCloseForm('Your Meal was added successfully', response.identifier);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={(e) => handleFormSubmit(e)}>
      <FormControl>
        <FormLabel>Glucose</FormLabel>
        <Input
          onChange={(e) => setGlucose(e.target.value)}
          placeholder='Your current measurement'
          slotProps={{ input: { inputMode: 'numeric', pattern: '[0-9]*' } }}
          type='number'
          value={glucose}
        />
      </FormControl>

      <FormControl sx={{ mt: 2 }}>
        <Input
          onChange={(e) => setCarbs(e.target.value)}
          slotProps={{ input: { inputMode: 'numeric', pattern: '[0-9]*' } }}
          startDecorator={
            <>
              <Typography>Carbs</Typography>
              <Divider orientation='vertical' sx={{ ml: 1.5 }} />
            </>
          }
          endDecorator={'g'}
          type='number'
          value={carbs}
        />
      </FormControl>
      <FormControl sx={{ mt: 1 }}>
        <Input
          onChange={(e) => setProtein(e.target.value)}
          slotProps={{ input: { inputMode: 'numeric', pattern: '[0-9]*' } }}
          startDecorator={
            <>
              <Typography>Protein</Typography>
              <Divider orientation='vertical' sx={{ ml: 1.5 }} />
            </>
          }
          endDecorator={'g'}
          type='number'
          value={protein}
        />
      </FormControl>
      <FormControl sx={{ mt: 1 }}>
        <Input
          onChange={(e) => setFat(e.target.value)}
          slotProps={{ input: { inputMode: 'numeric', pattern: '[0-9]*' } }}
          startDecorator={
            <>
              <Typography>Fat</Typography>
              <Divider orientation='vertical' sx={{ ml: 1.5 }} />
            </>
          }
          endDecorator={'g'}
          type='number'
          value={fat}
        />
      </FormControl>

      <FormControl sx={{ mt: 2 }}>
        <FormLabel>Insulin</FormLabel>
        <Input
          endDecorator={'mmol'}
          onChange={(e) => setInsulin(e.target.value)}
          slotProps={{ input: { inputMode: 'numeric', pattern: '[0-9]*' } }}
          type='number'
          value={insulin}
        />
      </FormControl>
      <FormControl sx={{ mt: 1 }}>
        <Input
          onChange={(e) => setPreBolus(e.target.value)}
          slotProps={{ input: { inputMode: 'numeric', pattern: '[0-9]*' } }}
          startDecorator={
            <>
              <Typography>Pre-Bolus</Typography>
              <Divider orientation='vertical' sx={{ ml: 1.5 }} />
            </>
          }
          endDecorator={'min'}
          type='number'
          value={preBolus}
        />
      </FormControl>
      <FormControl sx={{ mt: 2 }}>
        <FormLabel>Notes</FormLabel>
        <Textarea
          minRows={2}
          placeholder='Additional comments'
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

export default MealForm;
