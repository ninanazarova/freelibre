import { Button, Typography } from '@mui/joy';
import { useNavigate } from 'react-router-dom';
import ContentWrapper from '../components/ContentWrapper';
import { authProvider } from '../auth';
import { storage } from '../storage';

const Settings = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    authProvider.logout();
    navigate('/login');
  };

  return (
    <ContentWrapper title='Settings'>
      <Typography level='body-lg'>URL: {storage.getBaseUrl()}</Typography>
      <Button onClick={handleClick} color='danger' size='lg'>
        Logout
      </Button>
    </ContentWrapper>
  );
};

export default Settings;
