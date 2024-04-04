import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Typography,
  inputClasses,
} from '@mui/joy';
import { ChangeEvent, useState } from 'react';
import { useAuth } from '../SetupContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [url, setUrl] = useState('');
  const [token, setToken] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSave = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem('base_url', JSON.stringify(url));
    localStorage.setItem('refresh_token', JSON.stringify(token));

    auth.loginUser(token, url);

    navigate('/', { replace: true });
  };

  return (
    <Stack
      direction='column'
      justifyContent='center'
      alignItems='center'
      spacing={3}
      sx={{ px: 4, minHeight: '100vh', bgcolor: 'background.level1' }}
    >
      <Typography level='h3'>Set up your Libra</Typography>
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
  );
};

export default LoginPage;
