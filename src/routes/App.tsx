import * as React from 'react';

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
