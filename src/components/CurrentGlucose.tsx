import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';

const CurrentGlucose = (props: { sgv: number }) => {
  return (
    <Sheet color='success' variant='soft' sx={{ p: 8 }}>
      <Typography level='h1' component='div' className='text-center'>
        {props.sgv}
      </Typography>
    </Sheet>
  );
};

export default CurrentGlucose;
