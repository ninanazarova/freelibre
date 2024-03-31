import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import { Box } from '@mui/joy';

const TimeControls = () => {
  return (
    <Box sx={{ display: 'flex', pt: 1, justifyContent: 'center', bgcolor: 'white' }}>
      <Tabs aria-label='tabs' defaultValue={0} sx={{ bgcolor: 'transparent', width: '80%' }}>
        <TabList
          disableUnderline
          sx={{
            p: 0.5,
            gap: 0.5,
            borderRadius: 'xl',
            bgcolor: 'background.level2',
            [`> .${tabClasses.root}`]: {
              flex: '1 1 auto',
            },
            [`& .${tabClasses.root}[aria-selected="true"]`]: {
              boxShadow: 'sm',
              bgcolor: 'background.surface',
            },
          }}
        >
          <Tab disableIndicator>12H</Tab>
          <Tab disableIndicator>6H</Tab>
          <Tab disableIndicator>3H</Tab>
          <Tab disableIndicator>1H</Tab>
        </TabList>
      </Tabs>
    </Box>
  );
};

export default TimeControls;
