import { KeyboardArrowRight } from '@mui/icons-material';
import {
  Button,
  List,
  ListDivider,
  ListItemButton,
  ListItemContent,
  Stack,
  Typography,
} from '@mui/joy';
import { ListItem } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../SetupContext';

const Settings = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <Stack direction='column' spacing={3} sx={{ px: 3, mt: 6 }}>
      <Typography level='h2'>Settings</Typography>
      <List
        size='lg'
        sx={{
          '> li': {
            p: 0,
          },
          borderRadius: 'md',
          bgcolor: 'background.surface',
          '--ListItemDecorator-size': '50px',
          '--ListItem-minHeight': '60px',
          '--ListDivider-gap': '0',
          '> li > a:not(.Mui-selected, [aria-selected="true"]):hover': {
            bgcolor: 'background.level2',
          },
          '> li > a:not(.Mui-selected, [aria-selected="true"]):active': {
            bgcolor: 'background.level3',
          },
          '> li:first-of-type > a': {
            borderTopRightRadius: 'var(--List-radius)',
            borderTopLeftRadius: 'var(--List-radius)',
          },
          '> li:last-child > a': {
            borderBottomRightRadius: 'var(--List-radius)',
            borderBottomLeftRadius: 'var(--List-radius)',
          },
        }}
      >
        <ListItem>
          <ListItemButton component={RouterLink} to='nightscout-url'>
            <ListItemContent>NightScout URL</ListItemContent>
            <KeyboardArrowRight fontSize='small' />
          </ListItemButton>
        </ListItem>
        <ListDivider />
        <ListItem>
          <ListItemButton component={RouterLink} to='access-token'>
            <ListItemContent>Token</ListItemContent>
            <KeyboardArrowRight fontSize='small' />
          </ListItemButton>
        </ListItem>
      </List>
      <Button
        color='danger'
        onClick={() => {
          logout();
          navigate('/login');
        }}
        size='lg'
      >
        Logout
      </Button>
    </Stack>
  );
};

export default Settings;
