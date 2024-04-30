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
import { ChangeEvent, useState } from 'react';
import { useAuth } from '../SetupContext';
import { useLocation, useNavigate } from 'react-router-dom';
import client from '../api';

const LoginPage = () => {
  const [url, setUrl] = useState('');
  const [token, setToken] = useState('');
  const [showInfo, setShowInfo] = useState(false);
  const { setBaseUrl, setRefreshToken } = useAuth();
  const navigate = useNavigate();
  let location = useLocation();

  const handleSave = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    client.setAuth({ baseUrl: url, refreshToken: token });

    try {
      const response = await client.authorize();

      if (response) {
        setBaseUrl(url);
        setRefreshToken(token);
        navigate('/overview', { replace: true });
      } else {
        setShowInfo(true);
        setUrl('');
        setToken('');
      }
    } catch (e) {
      alert(`Login Page catch err-${e}`);
    }
  };

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
        Incorrect data. Please try again
      </Snackbar>

      <Stack
        direction='column'
        justifyContent='center'
        alignItems='center'
        spacing={3}
        sx={{ px: 4, minHeight: '100vh', bgcolor: 'background.level1' }}
      >
        <Typography level='h3'>Set up your Libra</Typography>
        {location.state?.hasBadCredentials && (
          <Typography color='warning' level='title-md' variant='soft'>
            Your credentials have expired. Log in again
          </Typography>
        )}
        <form onSubmit={handleSave}>
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
              <Input value={url} onChange={(e) => setUrl(e.target.value)} required />
            </FormControl>
            <FormControl size='lg'>
              <FormLabel>Token</FormLabel>
              <Input value={token} onChange={(e) => setToken(e.target.value)} required />
            </FormControl>
            <Button size='lg' type='submit'>
              Save
            </Button>
          </Stack>
        </form>
      </Stack>
    </>
  );
};

export default LoginPage;
