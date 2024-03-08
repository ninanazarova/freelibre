import Entry from '../models/EntryModel';
import Treatment from '../models/TreatmentModel';

import dayjs from 'dayjs';
import {
  ChartsAxisHighlight,
  ChartsReferenceLine,
  ChartsTooltip,
  ChartsXAxis,
  ChartsYAxis,
  LinePlot,
  MarkPlot,
  ResponsiveChartContainer,
  useDrawingArea,
  useYScale,
} from '@mui/x-charts';
import { useEffect, useState } from 'react';

const NormalRange = () => {
  const low = 5;
  const high = 10;
  const { left, width } = useDrawingArea();
  const scale = useYScale();
  const highY = scale(high);
  const lowY = scale(low);

  return <rect x={left} y={highY} width={width} height={lowY - highY} fill='#f3f9eb' />;
};

interface Record {
  date: number;
  isTreatment?: boolean;
  mbg: number | null;
}
const merge = (es: Entry[], ts: Treatment[]): Array<Record> => {
  let res = [];

  let i = 0;
  let j = 0;

  while (i < es.length && j < ts.length) {
    if (es[i].date >= ts[j].date) {
      res.push({ ...ts[j], isTreatment: true, mbg: null });
      j++;
    } else {
      res.push(es[i]);
      i++;
    }
  }

  for (; i < es.length; i++) res.push(es[i]);
  for (; j < ts.length; j++) res.push({ ...ts[j], isTreatment: true, mbg: null });

  return res;
};

type Props = {
  entries: Entry[];
  treatments: Treatment[];
};
const Chart = ({ entries, treatments }: Props) => {
  const [x, setX] = useState<number[]>([]);
  const [entryPoints, setEntryPoints] = useState<(number | null)[]>([]);
  const [treatPoints, setTreatPoints] = useState<(number | null)[]>([]);

  useEffect(() => {
    const x: number[] = [];
    const eSerie: Array<null | number> = [];
    const tSerie: Array<null | number> = [];
    const makeDataset = () => {
      const merged = merge(entries, treatments);
      for (let i = 0; i < merged.length; i++) {
        if (merged[i].isTreatment) {
          x.push(merged[i].date);
          // TODO: check which mbg value to push i+1 or i-1 and check if not null
          tSerie.push(merged[i + 1].mbg);
          eSerie.push(merged[i + 1].mbg);
        } else {
          x.push(merged[i].date);
          tSerie.push(null);
          eSerie.push(merged[i].mbg);
        }
      }
    };
    makeDataset();

    setX(x);
    setEntryPoints(eSerie);
    setTreatPoints(tSerie);
  }, [entries, treatments]);

  return (
    <ResponsiveChartContainer
      height={400}
      margin={{ top: 20, bottom: 30, left: 30, right: 30 }}
      series={[
        { type: 'line', data: entryPoints, color: 'black', showMark: false },
        {
          type: 'line',
          data: treatPoints,
          color: 'red',
          showMark: true,
        },
      ]}
      xAxis={[
        {
          id: 'datetime',
          data: x,
          scaleType: 'time',
          valueFormatter: (v) => dayjs(v).format('HH:mm'),
        },
      ]}
      yAxis={[
        {
          id: 'glucose',
          min: 3,
          max: 21,
          valueFormatter: (v: number) => v.toString(),
        },
      ]}
    >
      <ChartsReferenceLine y={20} lineStyle={{ stroke: '#cecece' }} />
      <ChartsReferenceLine y={15} lineStyle={{ stroke: '#cecece' }} />
      <ChartsReferenceLine y={10} lineStyle={{ stroke: '#cecece' }} />
      <ChartsReferenceLine y={5} lineStyle={{ stroke: '#cecece' }} />

      <NormalRange />
      <LinePlot />
      <MarkPlot />

      <ChartsAxisHighlight x='line' />
      <ChartsTooltip trigger='axis' />

      <ChartsXAxis axisId='datetime' />
      <ChartsYAxis axisId='glucose' disableLine={true} disableTicks={true} />
    </ResponsiveChartContainer>
  );
};

export default Chart;
