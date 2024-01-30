import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';

const CurrentGlucose = (props: { sgv: number }) => {
  return (
    <Sheet color='success' variant='soft' sx={{ p: 8 }}>
      <Typography level='h2' component='div'>
        {props.sgv}
      </Typography>
    </Sheet>
  );
};

export default CurrentGlucose;
