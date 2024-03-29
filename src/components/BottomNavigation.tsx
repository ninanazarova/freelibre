import { Box, IconButton, Stack } from '@mui/joy';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AddIcon from '@mui/icons-material/Add';
import Search from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';

import { NavLink } from 'react-router-dom';
import { useState } from 'react';

type NavLinkRenderProps = {
  isActive: boolean;
  isPending: boolean;
};

const BottomNavigation = () => {
  const [pressed, setPressed] = useState<'home' | 'add' | 'search' | 'settings' | ''>('');

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
          to='/'
          className={({ isActive, isPending }: NavLinkRenderProps) => {
            if (isActive || isPending) setPressed('home');
            return '';
          }}
        >
          <IconButton
            aria-label='Home'
            aria-pressed={pressed === 'home'}
            variant='plain'
            color='neutral'
            size='lg'
          >
            <HomeRoundedIcon />
          </IconButton>
        </NavLink>

        <NavLink
          to='new'
          className={({ isActive, isPending }: NavLinkRenderProps) => {
            if (isActive || isPending) setPressed('add');
            return '';
          }}
        >
          <IconButton
            aria-label='Add New Treatment'
            aria-pressed={pressed === 'add'}
            variant='plain'
            color='neutral'
            size='lg'
          >
            <AddIcon />
          </IconButton>
        </NavLink>

        <NavLink
          to='search'
          className={({ isActive, isPending }: NavLinkRenderProps) => {
            if (isActive || isPending) setPressed('search');
            return '';
          }}
        >
          <IconButton
            aria-label='Search'
            aria-pressed={pressed === 'search'}
            variant='plain'
            color='neutral'
            size='lg'
          >
            <Search />
          </IconButton>
        </NavLink>

        <NavLink
          to='settings'
          className={({ isActive, isPending }: NavLinkRenderProps) => {
            if (isActive || isPending) setPressed('settings');
            return '';
          }}
        >
          <IconButton
            aria-label='Settings'
            aria-pressed={pressed === 'settings'}
            variant='plain'
            color='neutral'
            size='lg'
          >
            <SettingsIcon />
          </IconButton>
        </NavLink>
      </Stack>
    </Box>
  );
};

export default BottomNavigation;
