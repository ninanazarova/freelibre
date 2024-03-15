import { Link, Stack } from '@mui/joy';
import { Link as RouterLink } from 'react-router-dom';

const Treatment = () => {
  return (
    <Stack direction='column' justifyContent='center' alignItems='center' spacing={3}>
      <Link component={RouterLink} to='meal'>
        Meal
      </Link>
      <Link component={RouterLink} to='rapid'>
        Rapid
      </Link>
      <Link component={RouterLink} to='long'>
        Long
      </Link>
      <Link component={RouterLink} to='exercise'>
        Exercise
      </Link>
    </Stack>
  );
};

export default Treatment;
