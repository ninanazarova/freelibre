import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import Entry from '../models/EntryModel';
import dayjs from 'dayjs';
import Box from '@mui/joy/Box';

const Chart = (props: { dataset: Entry[] }) => {
  const { dataset } = props;
  const connectNulls = false;

  return (
    <LineChart
      tooltip={{ trigger: 'axis' }}
      yAxis={[
        {
          min: 0,
          max: 20,
          tickMinStep: 5,
          valueFormatter: (v: number) => v.toString(),
        },
      ]}
      xAxis={[
        {
          dataKey: 'date',
          scaleType: 'utc',
          valueFormatter: (v) => dayjs(v).format('HH:00'),
        },
      ]}
      series={[
        {
          dataKey: 'sgv',
          showMark: false,
          connectNulls,
          valueFormatter: (v: number) => v.toString(),
        },
      ]}
      slots={{
        axisContent: (props) => {
          return (
            <Box
              sx={{
                padding: 2,
                backgroundColor: 'white',
                border: '1px solid grey',
              }}
            >
              {`Data value: ${
                props.dataIndex ? dataset[props.dataIndex].sgv : 'no Data'
              }`}
              <hr />
              {dayjs(props.axisValue).format('HH:mm:ss')}
            </Box>
          );
        },
      }}
      height={300}
      dataset={dataset}
    />
  );
};

export default Chart;
