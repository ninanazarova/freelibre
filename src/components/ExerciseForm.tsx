import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  RadioGroup,
  Radio,
} from '@mui/joy';

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
    </>
  );
};

export default ExerciseForm;
