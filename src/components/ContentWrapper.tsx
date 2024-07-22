import { Box, Typography } from '@mui/joy';
import React, { ReactNode } from 'react';

interface Props {
  title?: string;
  children: ReactNode;
}

const ContentWrapper = ({ title, children }: Props) => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      mt={2}
      mx='auto'
      sx={{
        maxWidth: '500px',
        '@media (max-width: 768px)': {
          maxWidth: '90%',
        },
      }}
    >
      {title && (
        <Typography level='h2' mt={5} mb={3}>
          {title}
        </Typography>
      )}
      <Box width='100%' display='flex' flexDirection='column' gap='20px'>
        {children}
      </Box>
    </Box>
  );
};

export default ContentWrapper;
