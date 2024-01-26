import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import Entry from '../EntryModel';
import { format } from 'date-fns';
import Box from '@mui/joy/Box';
import { calculate } from '../helpers';

const Chart = (props: { dataset: Entry[] }) => {
  return (
    <LineChart
      yAxis={[
        {
          min: 0,
          max: 25 * 18,
          tickMinStep: 18 * 5,
          valueFormatter: (v: number) => calculate(v).toString(),
        },
      ]}
      xAxis={[
        {
          dataKey: 'date',
          scaleType: 'utc',
          valueFormatter: (v) => format(v, 'HH:00'),
        },
      ]}
      series={[
        {
          dataKey: 'sgv',
          showMark: false,
          valueFormatter: (v: number) => calculate(v).toString(),
        },
      ]}
      slots={{
        axisContent: (props) => {
          const val = calculate(props.axisData.y?.value as number);
          return (
            <Box
              sx={{
                padding: 2,
                backgroundColor: 'white',
                border: '1px solid grey',
              }}
            >
              {val.toString()}
              <hr />
              {format(props.axisValue, 'HH:mm:ss')}
            </Box>
          );
        },
      }}
      height={300}
      dataset={props.dataset}
    />
  );
};

export default Chart;
