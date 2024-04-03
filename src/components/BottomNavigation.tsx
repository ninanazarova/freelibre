import { Box, IconButton, Stack } from '@mui/joy';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AddIcon from '@mui/icons-material/Add';
import Search from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';

import { NavLink } from 'react-router-dom';

const BottomNavigation = () => {
  return (
    <Box
      id='tab-bar'
      sx={{
        display: { sm: 'none' },
        zIndex: '999',
        bottom: 0,
        position: 'fixed',
        width: '100dvw',
        backgroundColor: 'background.body',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Stack
        direction='row'
        justifyContent='center'
        spacing={4}
        sx={{
          pt: 1,
          mx: 'auto',
          mb: 5,
          display: { xs: 'flex', sm: 'none' },
        }}
      >
        <NavLink
          to='overview'
          children={({ isActive }) => (
            <IconButton
              aria-label='Home'
              aria-pressed={isActive}
              variant='plain'
              color='neutral'
              size='lg'
            >
              <HomeRoundedIcon />
            </IconButton>
          )}
        />

        <NavLink
          to='new'
          children={({ isActive }) => (
            <IconButton
              aria-label='Add New Treatment'
              aria-pressed={isActive}
              variant='plain'
              color='neutral'
              size='lg'
            >
              <AddIcon />
            </IconButton>
          )}
        />

        <NavLink
          to='search'
          children={({ isActive }) => (
            <IconButton
              aria-label='Search'
              aria-pressed={isActive}
              variant='plain'
              color='neutral'
              size='lg'
            >
              <Search />
            </IconButton>
          )}
        />

        <NavLink
          to='settings'
          children={({ isActive }) => (
            <IconButton
              aria-label='Settings'
              aria-pressed={isActive}
              variant='plain'
              color='neutral'
              size='lg'
            >
              <SettingsIcon />
            </IconButton>
          )}
        />
      </Stack>
    </Box>
  );
};

export default BottomNavigation;
