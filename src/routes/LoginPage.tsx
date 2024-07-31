import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Snackbar,
  Stack,
  Typography,
  inputClasses,
} from '@mui/joy';
import { useEffect, useState } from 'react';
import { ActionFunctionArgs, Form, redirect, useActionData } from 'react-router-dom';
import { authProvider } from '../auth';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const baseUrl = formData.get('url') as string | null;
  const refreshToken = formData.get('token') as string | null;

  if (!baseUrl || !refreshToken) {
    return { error: 'You must provide url and token to log in' };
  }

  try {
    await authProvider.login(baseUrl, refreshToken);
  } catch (error) {
    return { error: 'Incorrect data. Please try again' };
  }

  return redirect('/overview');
}

const LoginPage = () => {
  let actionData = useActionData() as { error: string } | undefined;
  const [url, setUrl] = useState('');
  const [token, setToken] = useState('');
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    if (actionData) {
      setShowInfo(true);
      setUrl('');
      setToken('');
    }
  }, [actionData]);

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={3000}
        color='danger'
        open={showInfo}
        onClose={() => setShowInfo(false)}
        size='lg'
        variant='soft'
      >
        {actionData?.error}
      </Snackbar>

      <Stack
        direction='column'
        justifyContent='center'
        alignItems='center'
        spacing={3}
        sx={{ px: 4, minHeight: '100vh', bgcolor: 'background.level1' }}
      >
        <Typography level='h3'>Set up your Libra</Typography>
        <Form method='POST' replace>
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
            <FormControl size='lg'>
              <FormLabel>NightScout URL</FormLabel>
              <Input name='url' value={url} onChange={(e) => setUrl(e.target.value)} required />
            </FormControl>
            <FormControl size='lg'>
              <FormLabel>Token</FormLabel>
              <Input
                name='token'
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
              />
            </FormControl>
            <Button size='lg' type='submit'>
              Save
            </Button>
          </Stack>
        </Form>
      </Stack>
    </>
  );
};

export default LoginPage;
