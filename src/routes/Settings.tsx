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
import ContentWrapper from '../components/ContentWrapper';

const Settings = () => {
  const { getBaseUrl, getRefreshToken, logout } = useAuth();
  const baseUrl = getBaseUrl();
  const refreshToken = getRefreshToken();
  const navigate = useNavigate();
  return (
    <ContentWrapper title='Settings'>
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
            <ListItemContent>URL</ListItemContent>
            <Typography noWrap sx={{ color: 'neutral.500' }}>
              {baseUrl ? baseUrl : 'Is not set'}
            </Typography>
            <KeyboardArrowRight fontSize='small' />
          </ListItemButton>
        </ListItem>
        <ListDivider />
        <ListItem>
          <ListItemButton component={RouterLink} to='refresh-token'>
            <ListItemContent>Token</ListItemContent>
            <Typography noWrap sx={{ color: 'neutral.500' }}>
              {refreshToken ? refreshToken : 'Is not set'}
            </Typography>
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
    </ContentWrapper>
  );
};

export default Settings;
