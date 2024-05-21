import * as React from 'react';
import List from '@mui/joy/List';
import ListSubheader from '@mui/joy/ListSubheader';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemContent from '@mui/joy/ListItemContent';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AddIcon from '@mui/icons-material/Add';
import Search from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';

export default function Navigation() {
  const [index, setIndex] = useState(0);
  return (
    <List
      size='sm'
      sx={{
        '--ListItem-radius': 'var(--joy-radius-sm)',
        '--List-gap': '4px',
        textDecoration: 'none',
      }}
    >
      <ListItem nested>
        <ListSubheader sx={{ letterSpacing: '2px', fontWeight: '800' }}>FreeLibre</ListSubheader>
        <List
          aria-labelledby='nav-list-browse'
          sx={{
            '& .JoyListItemButton-root': { p: '8px' },
          }}
        >
          <ListItem>
            <ListItemButton
              component={RouterLink}
              to='overview'
              selected={index === 0}
              onClick={() => setIndex(0)}
            >
              <ListItemDecorator>
                <HomeRoundedIcon fontSize='small' />
              </ListItemDecorator>
              <ListItemContent>Overview</ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton
              component={RouterLink}
              to='new'
              selected={index === 1}
              onClick={() => setIndex(1)}
            >
              <ListItemDecorator sx={{ color: 'neutral.500' }}>
                <AddIcon fontSize='small' />
              </ListItemDecorator>
              <ListItemContent>New Treatment</ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton
              component={RouterLink}
              to='search'
              selected={index === 2}
              onClick={() => setIndex(2)}
            >
              <ListItemDecorator sx={{ color: 'neutral.500' }}>
                <Search fontSize='small' />
              </ListItemDecorator>
              <ListItemContent>Search</ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton
              component={RouterLink}
              to='settings'
              selected={index === 3}
              onClick={() => setIndex(3)}
            >
              <ListItemDecorator sx={{ color: 'neutral.500' }}>
                <SettingsIcon fontSize='small' />
              </ListItemDecorator>
              <ListItemContent>Settings</ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>
      </ListItem>
    </List>
  );
}
