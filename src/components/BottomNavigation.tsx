import { useState } from 'react';
import { Box, Button, TabPanel, Tabs, TabList, Tab, tabClasses, Input } from '@mui/joy';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AddIcon from '@mui/icons-material/Add';
import Search from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import TreatmentModal from './TreatmentModal';
import client from '../api';

type Props = {
  onShowAlert: (message: string, id: string) => void;
};

const BottomNavigation = ({ onShowAlert }: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const [index, setIndex] = useState(-1);
  const [formName, setFormName] = useState<null | string>(null);
  const [searchString, setSearchString] = useState('');

  const handleButtonClick = (formName: string) => {
    setFormName(formName);
    setOpenModal(true);
    setIndex(-1);
  };

  const handleSearchClick = async () => {
    try {
      // setIsLoading(true);
      const response = await client.searchTreatments(searchString);
      console.log(response);
    } catch (err) {
      console.log(err);
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          bgcolor: 'white',
          zIndex: 2,
          position: 'fixed',
          bottom: 0,
          right: 0,
          left: 0,
          borderTop: '1px solid #ededf0',
        }}
      >
        <Tabs
          aria-label='Bottom Navigation'
          value={index}
          onChange={(event, value) => setIndex(value as number)}
          sx={{
            pt: 1,
            bgcolor: 'inherit',
            [`.${tabClasses.root} .MuiSvgIcon-root`]: { fontSize: '2rem' },
            [`.${tabClasses.root}.${tabClasses.selected}`]: {
              bgcolor: 'white',
              color: '#0B0D0E',
            },
            [`.${tabClasses.root}:not(${tabClasses.selected}):hover`]: {
              bgcolor: 'white',
            },
            [`.${tabClasses.root}:not(.${tabClasses.selected}):not(:hover)`]: {
              opacity: 0.6,
            },
          }}
        >
          <TabPanel value={1}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 1,
                justifyContent: 'center',
              }}
            >
              <Button onClick={() => handleButtonClick('Meal')}>Meal</Button>
              <Button onClick={() => handleButtonClick('Rapid-acting')}>Rapid-acting</Button>
              <Button onClick={() => handleButtonClick('Long-acting')}>Long-acting</Button>
              <Button onClick={() => handleButtonClick('Exercise')}>Exercise</Button>
            </Box>
          </TabPanel>
          <TabPanel value={2}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 1,
                justifyContent: 'center',
              }}
            >
              <Input onChange={(e) => setSearchString(e.target.value)} />
              <Button onClick={() => handleSearchClick()}>Search</Button>
            </Box>
          </TabPanel>
          <TabList disableUnderline size='lg' sx={{ mx: 'auto', mb: 3 }}>
            <Tab disableIndicator>
              <HomeRoundedIcon />
            </Tab>
            <Tab disableIndicator>
              <AddIcon />
            </Tab>
            <Tab disableIndicator>
              <Search />
            </Tab>
            <Tab disableIndicator>
              <SettingsIcon />
            </Tab>
          </TabList>
        </Tabs>
      </Box>

      <TreatmentModal
        open={openModal}
        title={formName}
        onShowAlert={onShowAlert}
        onSetOpen={setOpenModal}
      />
    </>
  );
};

export default BottomNavigation;
