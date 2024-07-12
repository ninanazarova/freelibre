import Treatment from '../models/TreatmentModel';
import { List, ListDivider, ListItem, ListItemDecorator, Typography } from '@mui/joy';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RestaurantTwoToneIcon from '@mui/icons-material/RestaurantTwoTone';
import KeyboardDoubleArrowRightSharpIcon from '@mui/icons-material/KeyboardDoubleArrowRightSharp';
import KeyboardArrowRightSharpIcon from '@mui/icons-material/KeyboardArrowRightSharp';
import dayjs from 'dayjs';
import { eventType } from '../models/TreatmentModel';
import { Fragment } from 'react';

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

const RecentTreatments = ({ treatments = [] }: Props) => {
  return (
    <List
      sx={{
        borderRadius: 'md',
        bgcolor: 'background.surface',
        'li:last-child': {
          display: 'none',
        },
      }}
    >
      {treatments.length === 0 ? (
        <>
          <ListItem>
            <Typography>No treatments found</Typography>
          </ListItem>
          <ListDivider inset='startContent' />
        </>
      ) : (
        (treatments as Treatment[]).map((treat) => {
          const content = render(treat.eventType);

          return (
            <Fragment key={treat.identifier}>
              <ListItem>
                <ListItemDecorator>{content.icon}</ListItemDecorator>

                <div>
                  <Typography level='body-sm'>{dayjs(treat.date).format('HH:mm')}</Typography>
                </div>

                <div>
                  <Typography level='title-sm'>{`${content.title}`}</Typography>
                  <Typography level='body-sm'>{treat.notes}</Typography>
                </div>
              </ListItem>
              <ListDivider inset='startContent' />
            </Fragment>
          );
        })
      )}
    </List>
  );
};

export default RecentTreatments;
