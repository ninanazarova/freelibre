import { Button, FormControl, FormLabel, Input, Stack, Typography, inputClasses } from '@mui/joy';
import { useState } from 'react';
import { useAuth } from '../SetupContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [token, setToken] = useState('');
  const [url, setUrl] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSave = async () => {
    localStorage.setItem('refresh_token', JSON.stringify(token));
    localStorage.setItem('base_url', JSON.stringify(url));

    await auth.loginUser(token, url);
    navigate('/');
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
        <FormControl required size='lg'>
          <FormLabel>NightScout URL</FormLabel>
          <Input onChange={(e) => setUrl(e.target.value)} />
        </FormControl>
        <FormControl required size='lg'>
          <FormLabel>Token</FormLabel>
          <Input onChange={(e) => setToken(e.target.value)} />
        </FormControl>
        <Button size='lg' type='button' onClick={handleSave}>
          Save
        </Button>
      </Stack>
    </Stack>
  );
};

export default LoginPage;
