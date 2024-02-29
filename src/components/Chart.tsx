import Entry from '../models/EntryModel';
import dayjs from 'dayjs';
import {
  ChartsAxisHighlight,
  ChartsReferenceLine,
  ChartsTooltip,
  ChartsXAxis,
  ChartsYAxis,
  LinePlot,
  ResponsiveChartContainer,
  useDrawingArea,
  useYScale,
} from '@mui/x-charts';

type Props = {
  dataset: Entry[];
};

const NormalRange = () => {
  const low = 5;
  const high = 10;
  const { left, width } = useDrawingArea();
  const scale = useYScale();
  const highY = scale(high);
  const lowY = scale(low);

  return <rect x={left} y={highY} width={width} height={lowY - highY} fill='#f3f9eb' />;
};

const Chart = ({ dataset }: Props) => {
  return (
    <ResponsiveChartContainer
      dataset={dataset}
      height={400}
      margin={{ top: 20, bottom: 30, left: 30, right: 30 }}
      series={[
        {
          id: 'main',
          type: 'line',
          dataKey: 'mbg',
          showMark: false,
          color: 'black',
          valueFormatter: (v: number) => v.toString(),
        },
      ]}
      xAxis={[
        {
          id: 'datetime',
          dataKey: 'date',
          scaleType: 'time',
          valueFormatter: (v) => dayjs(v).format('HH:mm'),
        },
      ]}
      yAxis={[
        {
          id: 'glucose',
          min: 0,
          tickMinStep: 3,
          valueFormatter: (v: number) => v.toString(),
        },
      ]}
    >
      <ChartsReferenceLine y={20} lineStyle={{ stroke: '#cecece' }} />
      <ChartsReferenceLine y={15} lineStyle={{ stroke: '#cecece' }} />
      <ChartsReferenceLine y={10} lineStyle={{ stroke: '#cecece' }} />
      <ChartsReferenceLine y={5} lineStyle={{ stroke: '#cecece' }} />

      <NormalRange />
      <LinePlot id='main' />
      <ChartsAxisHighlight x='line' />
      <ChartsTooltip />

      <ChartsXAxis axisId='datetime' />
      <ChartsYAxis axisId='glucose' disableLine={true} disableTicks={true} />
    </ResponsiveChartContainer>
  );
};

export default Chart;
