import Treatment from '../models/TreatmentModel';
import {
  Box,
  List,
  ListDivider,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  Typography,
} from '@mui/joy';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RestaurantTwoToneIcon from '@mui/icons-material/RestaurantTwoTone';
import KeyboardDoubleArrowRightSharpIcon from '@mui/icons-material/KeyboardDoubleArrowRightSharp';
import KeyboardArrowRightSharpIcon from '@mui/icons-material/KeyboardArrowRightSharp';
import dayjs from 'dayjs';
import { eventType } from '../helpers';
import { Fragment } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { KeyboardArrowRight } from '@mui/icons-material';
import { sgvToMbg } from '../helpers';

type Props = {
  treatments: Treatment[] | [];
};

const render = (type: eventType) => {
  let icon;
  let title;
  switch (type) {
    case eventType.MEAL:
      icon = <RestaurantTwoToneIcon />;
      title = 'Meal';
      break;
    case eventType.EXERCISE:
      icon = <FitnessCenterIcon />;
      title = 'Exercise';
      break;
    case eventType.RAPID_ACTING:
      icon = <KeyboardArrowRightSharpIcon />;
      title = 'Rapid';
      break;
    case eventType.LONG_ACTING:
      icon = <KeyboardDoubleArrowRightSharpIcon />;
      title = 'Long';
      break;
  }
  return { icon, title };
};

const Treatments = ({ treatments = [] }: Props) => {
  return (
    <List
      size='lg'
      sx={{
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
      {treatments.length === 0 ? (
        <ListItem>
          <Typography>No treatments found</Typography>
        </ListItem>
      ) : (
        (treatments as Treatment[]).map((treat, index) => {
          const content = render(treat.eventType);

          return (
            <Fragment key={treat.identifier}>
              <ListItem>
                <ListItemButton
                  sx={{ display: 'grid', gridTemplateColumns: 'auto auto 1fr auto' }}
                  component={RouterLink}
                  to={treat.identifier}
                >
                  <ListItemDecorator>{content.icon}</ListItemDecorator>
                  <div>
                    <Typography level='body-sm'>{dayjs(treat.date).format('HH:mm')}</Typography>
                    <Typography level='body-sm'>{dayjs(treat.date).format('MMM DD')}</Typography>
                  </div>
                  <ListItemContent>
                    <Box display='flex' justifyContent='space-between'>
                      <Typography level='title-sm'>{`${content.title}`}</Typography>
                      {treat.freelibre_sgv && (
                        <Typography level='body-sm'>
                          {sgvToMbg(treat.freelibre_sgv)} → {sgvToMbg(treat.freelibre_sgv_2h)}
                        </Typography>
                      )}
                    </Box>
                    <Typography level='body-sm' noWrap>
                      {treat.notes}
                    </Typography>
                  </ListItemContent>

                  <KeyboardArrowRight fontSize='small' />
                </ListItemButton>
              </ListItem>
              {index + 1 !== treatments.length && <ListDivider inset='startContent' />}
            </Fragment>
          );
        })
      )}
    </List>
  );
};

export default Treatments;
