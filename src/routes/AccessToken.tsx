import { Button, FormControl, Input, Stack, Typography, inputClasses } from '@mui/joy';
import { ActionFunctionArgs, Form, redirect } from 'react-router-dom';
import { useOnShowAlert } from '../routes/Root';

export async function action({ request }: ActionFunctionArgs) {
  return redirect('/');
}
const AccessToken = () => {
  const { onShowAlert } = useOnShowAlert();
  return (
    <Stack direction='column' spacing={3} sx={{ px: 3, mt: 6 }}>
      <Typography level='h3'>Access Token</Typography>
      <Form method='post' onSubmit={(e) => onShowAlert('Access Token was updated!')}>
        <Stack
          spacing={2}
          sx={{
            [`& .${inputClasses.root}`]: {
              '--Input-focusedThickness': '1px',
            },
            [`& .${inputClasses.input}`]: {
              width: '100%',
            },
          }}
        >
          <FormControl>
            <Input name='accessToken' type='text' size='lg' />
          </FormControl>

          <Button size='lg' type='submit'>
            Send
          </Button>
        </Stack>
      </Form>
    </Stack>
  );
};

export default AccessToken;
