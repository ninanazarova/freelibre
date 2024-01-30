import Button from '@mui/joy/Button';
import AddIcon from '@mui/icons-material/Add';

const AddTreatmentButton = () => {
  const addTreatmentHandler = (e: any) => {
    e.preventDefault();
  };
  return (
    <Button
      color='danger'
      disabled={false}
      onClick={addTreatmentHandler}
      size='lg'
      variant='solid'
    >
      <AddIcon />
    </Button>
  );
};

export default AddTreatmentButton;
