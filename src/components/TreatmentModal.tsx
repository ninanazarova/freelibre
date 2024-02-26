import { Modal, ModalDialog, ModalClose, Typography } from '@mui/joy';
import MealForm from './MealForm';
import ExerciseForm from './ExerciseForm';

type Props = {
  open: boolean;
  title: string | null;
  onSetOpen: (value: boolean) => void;
  onShowAlert: (message: string, id: string) => void;
};

const TreatmentModal = ({ open, title, onSetOpen, onShowAlert }: Props) => {
  const handleCloseForm = (message: string, id: string) => {
    onSetOpen(false);
    onShowAlert(message, id);
  };
  return (
    <Modal
      aria-labelledby='modal-title'
      aria-describedby='modal-form'
      open={open}
      onClose={() => onSetOpen(false)}
    >
      <ModalDialog size='lg' variant='plain'>
        <ModalClose />

        <Typography id='modal-title' level='h2'>
          {title}
        </Typography>
        <div id='modal-form'>
          {title === 'Exercise' && <ExerciseForm onCloseForm={handleCloseForm} />}
          {title === 'Meal' && <MealForm onCloseForm={handleCloseForm} />}
        </div>
      </ModalDialog>
    </Modal>
  );
};

export default TreatmentModal;
