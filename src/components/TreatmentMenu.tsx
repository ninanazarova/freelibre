import AddIcon from '@mui/icons-material/Add';
import MenuButton from '@mui/joy/MenuButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';
import { useState } from 'react';

import ExerciseForm from './ExerciseForm';
import { ModalDialog, ModalClose, Modal } from '@mui/joy';
type Props = {
  onShowAlert: (message: string) => void;
};

const TreatmentMenu = ({ onShowAlert }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<string | null>(null);

  const handleMenuItemClick = (menuItem: string) => {
    setSelectedMenuItem(menuItem);
    setOpen(true);
  };

  const handleCloseForm = (message: string) => {
    setOpen(false);
    onShowAlert(message);
  };

  return (
    <div className='mx-8 flex justify-end'>
      <Dropdown>
        <MenuButton variant='soft' color='primary'>
          <AddIcon />
        </MenuButton>

        <Menu placement='bottom-end'>
          <MenuItem onClick={() => handleMenuItemClick('component1')}>Food</MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('component2')}>Rapid-acting</MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('component3')}>Long-acting</MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('ExerciseForm')}>Exercise</MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('component4')}>Note</MenuItem>
        </Menu>
      </Dropdown>

      {selectedMenuItem !== null && (
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog size='lg'>
            <ModalClose />
            {selectedMenuItem === 'ExerciseForm' && <ExerciseForm onCloseForm={handleCloseForm} />}
          </ModalDialog>
        </Modal>
      )}
    </div>
  );
};

export default TreatmentMenu;
