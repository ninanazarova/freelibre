import { Box, linkClasses, Link } from '@mui/joy';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AddIcon from '@mui/icons-material/Add';
import Search from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';

import { Link as RouterLink } from 'react-router-dom';

const BottomNavigation = () => {
  return (
    <Box
      sx={{
        bgcolor: 'white',
        zIndex: 2,
        position: 'fixed',
        bottom: 0,
        right: 0,
        left: 0,
        borderTop: '1px solid #ededf0',
      }}
    >
      <Box
        sx={{
          pt: 1,
          bgcolor: 'inherit',
          [`.${linkClasses.root} .MuiSvgIcon-root`]: { fontSize: '2rem' },
          [`.${linkClasses.root}`]: {
            bgcolor: 'white',
            color: '#0B0D0E',
          },
          [`.${linkClasses.root}:not(${linkClasses.focusVisible}):hover`]: {
            bgcolor: 'white',
          },
          [`.${linkClasses.root}:not(.${linkClasses.focusVisible}):not(:hover)`]: {
            opacity: 0.6,
          },
          mx: 'auto',
          mb: 5,
          display: 'flex',
          flexDirection: 'row',
          gap: 4,
          justifyContent: 'center',
        }}
      >
        <Link component={RouterLink} to='/'>
          <HomeRoundedIcon />
        </Link>
        <Link component={RouterLink} to='treatment'>
          <AddIcon />
        </Link>
        <Link component={RouterLink} to='search'>
          <Search />
        </Link>
        <Link component={RouterLink} to='settings'>
          <SettingsIcon />
        </Link>
      </Box>
    </Box>
  );
};

export default BottomNavigation;
