import {
  Button,
  FormControl,
  IconButton,
  Input,
  Stack,
  buttonClasses,
  inputClasses,
} from '@mui/joy';
import React, { useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { useAuth } from '../SetupContext';
import ContentWrapper from '../components/ContentWrapper';

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
    <ContentWrapper title='Nightscout URL'>
      <Stack
        spacing={2}
        sx={{
          [`& .${inputClasses.root}`]: {
            '--Input-focusedThickness': '1px',
          },
          [`& .${buttonClasses.root}.${buttonClasses.disabled}`]: {
            bgcolor: 'background.level2',
          },
        }}
      >
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
    </ContentWrapper>
  );
};

export default NightscoutUrl;
