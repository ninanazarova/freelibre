import React, { useState } from 'react';

import BottomNavigation from '../components/BottomNavigation';

import { Outlet, useNavigation, useOutletContext } from 'react-router-dom';
import { LinearProgress, Snackbar } from '@mui/joy';

function Root() {
  const [message, setMessage] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();

  const handleShowAlert = (message: string) => {
    setMessage(message);
    setOpen(true);
  };

  return (
    <>
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
      <div id='main-section'>
        {navigation.state === 'loading' && (
          <LinearProgress sx={{ position: 'absolute', top: 0, left: 0, right: 0 }} />
        )}

        <Outlet context={{ onShowAlert: handleShowAlert }} />
      </div>
      <BottomNavigation />
    </>
  );
}

export function useOnShowAlert() {
  return useOutletContext<{ onShowAlert: (message: string) => void }>();
}

export default Root;
