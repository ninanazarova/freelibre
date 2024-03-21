import * as React from 'react';

import Box from '@mui/joy/Box';

import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';

import AddIcon from '@mui/icons-material/Add';

import Layout from '../components/Layout';
import Navigation from '../components/Navigation';

import { Outlet, useNavigation, useOutletContext } from 'react-router-dom';
import { LinearProgress, Snackbar } from '@mui/joy';
import BottomNavigation from '../components/BottomNavigation';
import { useState } from 'react';

function App() {
  const [message, setMessage] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();

  const handleShowAlert = (message: string) => {
    setMessage(message);
    setOpen(true);
  };

  return (
    <>
      <BottomNavigation />
      <Layout.Root>
        <Layout.SideNav>
          <Navigation />
        </Layout.SideNav>
        <Layout.SidePane>
          <Box
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography level='title-lg' textColor='text.secondary' component='h1'>
              Treatments
            </Typography>
            <Button startDecorator={<AddIcon />} size='sm'>
              Add new
            </Button>
          </Box>
        </Layout.SidePane>
        <Layout.Main>
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={3000}
            color='primary'
            open={open}
            onClose={() => setOpen(false)}
            size='md'
            variant='soft'
          >
            {message}
          </Snackbar>

          {navigation.state === 'loading' && (
            <LinearProgress sx={{ position: 'absolute', top: 0, left: 0, right: 0 }} />
          )}

          <Outlet context={{ onShowAlert: handleShowAlert }} />
        </Layout.Main>
      </Layout.Root>
    </>
  );
}

export default App;

export function useOnShowAlert() {
  return useOutletContext<{ onShowAlert: (message: string) => void }>();
}
