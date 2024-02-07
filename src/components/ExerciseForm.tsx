import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  RadioGroup,
  Radio,
} from '@mui/joy';

import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/de';

type Props = {};

const ExerciseForm = (props: Props) => {
  return (
    <>
      <FormControl>
        <FormLabel>Duration</FormLabel>
        <Input placeholder='In minutes' />
      </FormControl>
      <FormControl>
        <FormLabel>Notes</FormLabel>
        <Textarea placeholder='Anything about your exercise moments' />
      </FormControl>
      <FormControl>
        <FormLabel>Event time</FormLabel>
        <RadioGroup defaultValue='outlined' name='radio-buttons-group'>
          <Radio value='now' label='Now' />
          <Radio value='other' label='Other' />
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormLabel>Date and time</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='de'>
          <DateTimePicker format='DD.MM.YYYY HH:mm' ampm={false} />
        </LocalizationProvider>
      </FormControl>
    </>
  );
};

export default ExerciseForm;
