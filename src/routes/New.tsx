import {
  List,
  ListDivider,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  Sheet,
  Stack,
  Typography,
  sheetClasses,
} from '@mui/joy';
import { Link as RouterLink } from 'react-router-dom';

import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RestaurantTwoToneIcon from '@mui/icons-material/RestaurantTwoTone';
import KeyboardDoubleArrowRightSharpIcon from '@mui/icons-material/KeyboardDoubleArrowRightSharp';
import KeyboardArrowRightSharpIcon from '@mui/icons-material/KeyboardArrowRightSharp';
import { KeyboardArrowRight } from '@mui/icons-material';
import ContentWrapper from '../components/ContentWrapper';

const New = () => {
  return (
    <ContentWrapper title='New Treatment'>
      <List
        size='lg'
        sx={{
          borderRadius: 'md',
          bgcolor: 'background.surface',
          '--ListItemDecorator-size': '50px',
          '--ListItem-minHeight': '60px',
          '--ListDivider-gap': '0',
          [`& .${sheetClasses.root}`]: {
            p: 0.5,
            lineHeight: 0,
            borderRadius: 'sm',
          },
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
          <ListItemButton component={RouterLink} to='meal'>
            <ListItemDecorator>
              <Sheet variant='solid' color='primary'>
                <RestaurantTwoToneIcon />
              </Sheet>
            </ListItemDecorator>
            <ListItemContent>Meal</ListItemContent>
            <KeyboardArrowRight fontSize='small' />
          </ListItemButton>
        </ListItem>
        <ListDivider inset='startContent' />

        <ListItem>
          <ListItemButton component={RouterLink} to='rapid'>
            <ListItemDecorator>
              <Sheet variant='solid' color='danger'>
                <KeyboardArrowRightSharpIcon />
              </Sheet>
            </ListItemDecorator>
            <ListItemContent>Rapid</ListItemContent>
            <KeyboardArrowRight fontSize='small' />
          </ListItemButton>
        </ListItem>
        <ListDivider inset='startContent' />

        <ListItem>
          <ListItemButton component={RouterLink} to='long'>
            <ListItemDecorator>
              <Sheet variant='solid' color='warning'>
                <KeyboardDoubleArrowRightSharpIcon />
              </Sheet>
            </ListItemDecorator>
            <ListItemContent>Long</ListItemContent>
            <KeyboardArrowRight fontSize='small' />
          </ListItemButton>
        </ListItem>
        <ListDivider inset='startContent' />

        <ListItem>
          <ListItemButton component={RouterLink} to='exercise'>
            <ListItemDecorator>
              <Sheet variant='solid' color='success'>
                <FitnessCenterIcon />
              </Sheet>
            </ListItemDecorator>
            <ListItemContent>Exercise</ListItemContent>
            <KeyboardArrowRight fontSize='small' />
          </ListItemButton>
        </ListItem>
      </List>
    </ContentWrapper>
  );
};

export default New;
