import * as React from 'react';
import Box, { BoxProps } from '@mui/joy/Box';

function Root(props: BoxProps) {
  return (
    <Box
      {...props}
      sx={[
        {
          bgcolor: 'background.appBody',
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'minmax(64px, 200px) minmax(450px, 1fr)',
            md: 'minmax(160px, 200px) minmax(200px, 300px) minmax(500px, 1fr)',
          },
          minHeight: '100vh',
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    />
  );
}

function SideNav(props: BoxProps) {
  return (
    <Box
      component='nav'
      className='Navigation'
      {...props}
      sx={[
        {
          p: 2,
          bgcolor: 'background.surface',
          borderRight: '1px solid',
          borderColor: 'divider',
          display: {
            xs: 'none',
            sm: 'initial',
          },
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    />
  );
}

function SidePane(props: BoxProps) {
  return (
    <Box
      className='Inbox'
      {...props}
      sx={[
        {
          bgcolor: 'background.surface',
          borderRight: '1px solid',
          borderColor: 'divider',
          display: {
            xs: 'none',
            md: 'initial',
          },
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    />
  );
}

function Main(props: BoxProps) {
  return (
    <Box
      component='main'
      className='Main'
      {...props}
      sx={[{ bgcolor: 'background.level1' }, ...(Array.isArray(props.sx) ? props.sx : [props.sx])]}
    />
  );
}

export default {
  Root,
  SideNav,
  SidePane,
  Main,
};