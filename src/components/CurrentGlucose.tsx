import Typography from '@mui/joy/Typography';
import NorthIcon from '@mui/icons-material/North';
import { Direction } from '../models/EntryModel';
import { Box } from '@mui/joy';

const degrees = {
  DoubleUp: '0',
  SingleUp: '20',
  FortyFiveUp: '45',
  Flat: '90',
  FortyFiveDown: '135',
  SingleDown: '160',
  DoubleDown: '180',
};

type Props = {
  direction: Direction;
  mbg: number;
};

const CurrentGlucose = ({ direction, mbg }: Props) => {
  const color = () => {
    if (mbg < 5) {
      document.body.style.backgroundColor = '#3fb7ff';
      return '#3fb7ff';
    }
    if (mbg >= 5 && mbg <= 10) {
      document.body.style.backgroundColor = '#69cc26';
      return '#69cc26';
    }
    if (mbg > 10 && mbg < 14) {
      document.body.style.backgroundColor = '#ffd233';
      return '#ffd233';
    }
    if (mbg >= 14) {
      document.body.style.backgroundColor = '#ff5d33';
      return '#ff5d33';
    }
  };

  return (
    <Box sx={{ padding: { xs: 2, sm: 4 }, bgcolor: color }}>
      <Typography level='h1' textAlign='center' fontWeight={800}>
        {mbg}
        <NorthIcon
          fontSize='medium'
          sx={{ ml: 1, transform: `rotate(${degrees[direction]}deg)` }}
        />
      </Typography>
    </Box>
  );
};

export default CurrentGlucose;
