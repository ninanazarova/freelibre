import AspectRatio from '@mui/joy/AspectRatio';
import Typography from '@mui/joy/Typography';

const CurrentGlucose = (props: { sgv: number }) => {
  return (
    <AspectRatio>
      <Typography level='h2' component='div'>
        {props.sgv / 18}
      </Typography>
    </AspectRatio>
  );
};

export default CurrentGlucose;
