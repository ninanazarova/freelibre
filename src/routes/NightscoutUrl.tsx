import {
  Button,
  FormControl,
  IconButton,
  Input,
  Stack,
  Typography,
  buttonClasses,
  inputClasses,
} from '@mui/joy';
import React, { useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { useAuth } from '../SetupContext';

const NightscoutUrl = () => {
  const { getBaseUrl, setBaseUrl } = useAuth();
  const [url, setUrl] = useState(getBaseUrl());
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const clearSearch = () => {
    setUrl('');
    if (inputRef.current !== null) {
      inputRef.current.value = '';
    }
  };
  return (
    <Stack
      direction='column'
      spacing={3}
      sx={{
        px: 3,
        mt: 6,
        [`& .${inputClasses.root}`]: {
          '--Input-focusedThickness': '1px',
        },
        [`& .${buttonClasses.root}.${buttonClasses.disabled}`]: {
          bgcolor: 'background.level2',
        },
      }}
    >
      <Typography level='h3'>Nightscout URL</Typography>
      <FormControl>
        <Input
          size='lg'
          slotProps={{
            input: {
              id: 'q',
              ref: inputRef,
            },
          }}
          defaultValue={url as string}
          onChange={handleChange}
          endDecorator={
            <IconButton
              aria-label='Clear'
              variant='plain'
              color='neutral'
              type='button'
              sx={{ borderRadius: '8px' }}
              onClick={clearSearch}
            >
              <CancelIcon />
            </IconButton>
          }
        />
      </FormControl>
      <Button disabled={url === ''} size='lg' onClick={() => setBaseUrl(url as string)}>
        Save
      </Button>
    </Stack>
  );
};

export default NightscoutUrl;
