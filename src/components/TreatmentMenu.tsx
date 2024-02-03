import AddIcon from '@mui/icons-material/Add';
import MenuButton from '@mui/joy/MenuButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';
import { useState } from 'react';

import ExerciseForm from './ExerciseForm';
import { ModalDialog } from '@mui/joy';

const TreatmentMenu = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string | null>(null);

  const handleMenuItemClick = (menuItem: string) => {
    setSelectedMenuItem(menuItem);
  };

  return (
    <>
      <Dropdown>
        <MenuButton variant='soft' color='primary' size='lg'>
          <AddIcon />
        </MenuButton>

        <Menu placement='bottom-end' size='lg'>
          <MenuItem onClick={() => handleMenuItemClick('component1')}>
            Food
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('component2')}>
            Rapid-acting
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('component3')}>
            Long-acting
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('ExerciseForm')}>
            Exercise
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('component4')}>
            Note
          </MenuItem>
        </Menu>
      </Dropdown>

      {selectedMenuItem !== null && (
        <ModalDialog size='lg'>
          {selectedMenuItem === 'ExerciseForm' && <ExerciseForm />}
        </ModalDialog>
      )}
    </>
  );
};

export default TreatmentMenu;
