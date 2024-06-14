import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  LineController,
  BarController,
  ChartOptions,
  TimeScale,
  ChartData,
  Plugin,
  ChartType,
} from 'chart.js';

import 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm';
import { Chart as ChartComponent } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';
import Entry from '../models/EntryModel';
import Treatment from '../models/TreatmentModel';
import { Box } from '@mui/joy';
import dayjs from 'dayjs';
import { useState } from 'react';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  LineController,
  BarController,
  TimeScale
);
ChartJS.register(zoomPlugin);

declare module 'chart.js' {
  interface PluginOptionsByType<TType extends ChartType> {
    fillBetweenLines?: {
      color: string;
      minY: number;
      maxY: number;
    };
  }
}

const customFillPlugin: Plugin = {
  id: 'fillBetweenLines',
  beforeDraw(chart, args, options) {
    const {
      ctx,
      chartArea: { left, right },
      scales: { y },
    } = chart;
    if (!options.minY || !options.maxY) return;

    const yMin = y.getPixelForValue(options.minY);
    const yMax = y.getPixelForValue(options.maxY);

    ctx.save();
    ctx.fillStyle = options.color || 'rgba(0, 0, 0, 0.1)';

    ctx.fillRect(left, yMax, right - left, yMin - yMax);
    ctx.restore();
  },
};
ChartJS.register(customFillPlugin);

type Props = {
  entries: Entry[];
  treatments: Treatment[];
  treatment?: Treatment;
};
type treatSerie = {
  date: number;
  mbg: number | null;
  eventType: string;
  notes: string;
};

const Chart = ({ entries, treatments }: Props) => {
  const THRESHOLD = 5 * 60 * 1000;
  const [treatSeries] = useState(
    treatments.map((treatment) => {
      // Find the closest entry to the treatment time within the threshold
      const closestEntry = entries.reduce((closest, entry) => {
        const timeDiff = Math.abs(entry.date - treatment.date);
        return timeDiff < Math.abs(closest.date - treatment.date) && timeDiff <= THRESHOLD
          ? entry
          : closest;
      }, entries[0]);

      return {
        date: treatment.date,
        mbg: closestEntry.mbg,
        eventType: treatment.eventType,
        notes: treatment.notes,
      };
    })
  );

  const data: ChartData<'line', Entry[] | treatSerie[]> = {
    datasets: [
      {
        label: 'Entries',
        pointStyle: false,
        borderColor: '#000',
        borderWidth: 2,
        borderJoinStyle: 'round',
        data: entries,
        order: 2,
      },
      {
        label: 'Treatments',
        pointStyle: 'circle',
        showLine: false,
        borderColor: 'red',
        borderWidth: 2,
        data: treatSeries,
        order: 1,
      },
    ],
  };
  const options: ChartOptions = {
    elements: {
      line: {
        tension: 1,
      },
    },
    plugins: {
      fillBetweenLines: {
        minY: 5,
        maxY: 10,
        color: '#f3f9eb',
      },
      tooltip: {
        intersect: false,
        callbacks: {
          title: (tooltipItems) => dayjs(tooltipItems[0].parsed.x).format('HH:mm'),
          label: (tooltipItem) => {
            if (tooltipItem.datasetIndex === 1) {
              return `${(tooltipItem.raw as treatSerie).eventType}`;
            }
            return `${tooltipItem.parsed.y} mmol/l`;
          },
          afterLabel: (tooltipItem) => {
            if (tooltipItem.datasetIndex === 1) {
              return `${tooltipItem.parsed.y} mmol/l`;
            }
          },
        },
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'x',
        },
        limits: {
          x: {
            min: 'original',
            max: 'original',
          },
        },
      },
    },
    parsing: {
      xAxisKey: 'date',
      yAxisKey: 'mbg',
    },
    scales: {
      x: {
        grid: {
          drawOnChartArea: false,
        },
        time: { unit: 'hour', displayFormats: { hour: 'HH:mm' } },
        ticks: {
          autoSkip: false,
          align: 'start',
          maxTicksLimit: 8,
          stepSize: 2,
        },
        type: 'time',
      },
      y: {
        bounds: 'data',
        min: 0,
        max: 20,
        ticks: {
          maxTicksLimit: 6,
        },
        grid: {
          drawTicks: false,
        },
      },
    },
    layout: {
      padding: {
        left: 5,
        right: 20,
        bottom: 0,
        top: 15,
      },
    },
    maintainAspectRatio: false,
  };
  const plugins: Plugin[] = [customFillPlugin];

  return (
    <Box
      sx={{
        background: 'white',
        position: 'relative',
        margin: 'auto',
        height: '45vh',
        maxWidth: '100vw',
      }}
    >
      <ChartComponent type='line' data={data} options={options} plugins={plugins} />
    </Box>
  );
};

export default Chart;
