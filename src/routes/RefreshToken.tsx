import { Button, FormControl, Input, Stack, inputClasses } from '@mui/joy';
import { ActionFunctionArgs, Form, redirect } from 'react-router-dom';
import { useOnShowAlert } from './Root';
import ContentWrapper from '../components/ContentWrapper';

export async function action({ request }: ActionFunctionArgs) {
  return redirect('/');
}
const RefreshToken = () => {
  const { onShowAlert } = useOnShowAlert();
  return (
    <ContentWrapper title='Refresh Token'>
      <Form method='post' onSubmit={(e) => onShowAlert('Refresh Token was changed!')}>
        <Stack
          spacing={2}
          sx={{
            [`& .${inputClasses.root}`]: {
              '--Input-focusedThickness': '1px',
            },
          }}
        >
          <FormControl>
            <Input name='refreshToken' type='text' size='lg' />
          </FormControl>

          <Button size='lg' type='submit'>
            Send
          </Button>
        </Stack>
      </Form>
    </ContentWrapper>
  );
};

export default RefreshToken;
