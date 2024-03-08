import Treatment from '../models/TreatmentModel';
import { Box, Card, CardContent, Typography } from '@mui/joy';
import dayjs from 'dayjs';

type Props = {
  treatments: Treatment[] | [];
};

const RecentTreatments = ({ treatments }: Props) => {
  let content;
  if (treatments.length === 0) {
    content = <span>There is no recent treatments</span>;
  } else {
    content = (treatments as Treatment[]).map((treat) => {
      return (
        <Card key={treat.identifier} variant='soft' sx={{ mt: 1 }}>
          <CardContent>
            <Typography level='title-md'>{treat.eventType}</Typography>
            <Typography level='body-md'>{treat.notes ? treat.notes : 'No notes'}</Typography>
            <Typography level='body-md'>{dayjs(treat.date).format('HH:mm')}</Typography>
          </CardContent>
        </Card>
      );
    });
  }

  return <Box sx={{ mx: 4 }}>{content}</Box>;
};

export default RecentTreatments;
