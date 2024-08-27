import { eventType, sgvToMbg } from './helpers';
import Entry, { Direction } from './models/EntryModel';
import Treatment, { TreatmentUnion } from './models/TreatmentModel';

export const generateEntries = (
  startTime: number,
  endTime: number,
  interval: number,
  minSugarLevel: number,
  maxSugarLevel: number
): Entry[] => {
  const entries: Entry[] = [];
  let currentTime = startTime;
  let i = 0;
  const directions = [
    'DoubleUp',
    'SingleUp',
    'FortyFiveUp',
    'Flat',
    'FortyFiveDown',
    'SingleDown',
    'DoubleDown',
  ];

  let previousBloodSugar = Math.random() * (maxSugarLevel - minSugarLevel) + minSugarLevel;

  // Define noise and trend parameters
  const noiseStdDev = 5; // Standard deviation for noise
  const mealImpact = 30; // Typical rise after a meal
  const insulinImpact = -30; // Typical drop after insulin

  while (currentTime <= endTime) {
    const hours = new Date(currentTime).getHours();
    let baseChange = 0;

    // Simulate meal times with gradual changes over an hour
    if ((hours >= 8 && hours < 9) || (hours >= 13 && hours < 14) || (hours >= 19 && hours < 20)) {
      baseChange += (Math.random() * mealImpact) / 6; // Spread the meal impact over an hour
    }

    // Simulate insulin effects shortly after meals with gradual changes
    if ((hours >= 9 && hours < 10) || (hours >= 14 && hours < 15) || (hours >= 20 && hours < 21)) {
      baseChange += (Math.random() * insulinImpact) / 6; // Spread the insulin impact over an hour
    }

    // Add circadian rhythm effect
    if (hours >= 4 && hours < 7) {
      baseChange += 10; // Dawn phenomenon
    }

    const direction = directions[Math.floor(Math.random() * directions.length)] as Direction;
    let change = (Math.random() - 0.5) * 5 + baseChange; // Random change with base pattern

    // Adjust change based on direction
    if (direction === 'DoubleUp') {
      change += 10;
    } else if (direction === 'SingleUp') {
      change += 5;
    } else if (direction === 'FortyFiveUp') {
      change += 2.5;
    } else if (direction === 'FortyFiveDown') {
      change -= 2.5;
    } else if (direction === 'SingleDown') {
      change -= 5;
    } else if (direction === 'DoubleDown') {
      change -= 10;
    }

    let bloodSugar = previousBloodSugar + change;

    // Add Gaussian noise
    const noise = noiseStdDev * (Math.random() - 0.5) * 2;
    bloodSugar += noise;

    bloodSugar = Math.max(minSugarLevel, Math.min(maxSugarLevel, bloodSugar));

    const entry = {
      date: currentTime,
      direction: directions[Math.floor(Math.random() * directions.length)] as Direction,
      identifier: `id-${i}`,
      sgv: Math.round(bloodSugar),
      mbg: sgvToMbg(bloodSugar),
    };
    currentTime += interval;
    i++;
    entries.push(entry);

    // Update previous blood sugar for next iteration
    previousBloodSugar = bloodSugar;
  }

  return entries;
};

export const generateTreatments = (): Treatment[] => {
  let treatments = [
    // running 7:00
    {
      app: 'demo-freelibre',
      eventType: eventType.EXERCISE,
      duration: 30,
      notes: 'Running',
      time: '7:00',
      identifier: 'treat-0',
    },
    // breakfast 8:00
    {
      app: 'demo-freelibre',
      eventType: eventType.MEAL,
      carbs: 10,
      protein: 0,
      fat: 0,
      insulin: 10,
      preBolus: 10,
      notes: 'Cheese croissant, vegetables, coffee, kinder pingui',
      time: '8:00',
      identifier: 'treat-1',
    },
    // lunch 13:00
    {
      app: 'demo-freelibre',
      eventType: eventType.MEAL,
      carbs: 10,
      protein: 0,
      fat: 0,
      insulin: 10,
      preBolus: 10,
      notes: 'Sausage with mashed potato, sauerkraut',
      time: '13:00',
      identifier: 'treat-2',
    },
    // long 17:00
    {
      app: 'demo-freelibre',
      eventType: eventType.LONG_ACTING,
      notes: '',
      insulin: 10,
      time: '17:00',
      identifier: 'treat-3',
    },
    // tennis 18:00
    {
      app: 'demo-freelibre',
      eventType: eventType.EXERCISE,
      duration: 50,
      notes: 'Tennis',
      time: '18:00',
      identifier: 'treat-4',
    },
    // dinner 19:00
    {
      app: 'demo-freelibre',
      eventType: eventType.MEAL,
      carbs: 10,
      protein: 0,
      fat: 0,
      insulin: 10,
      preBolus: 10,
      notes: 'Tuna salad with vegetables and avocado',
      time: '19:00',
      identifier: 'treat-5',
    },
  ];
  const referenceDate = new Date();

  const createTreatmentDate = (treat: any, referenceDate: Date) => {
    const [hours, minutes] = treat.time.split(':').map(Number);
    const treatDate = new Date(referenceDate);
    treatDate.setHours(hours, minutes, 0, 0);

    return treatDate;
  };

  const result = treatments.map((treat) => {
    const treatDate = createTreatmentDate(treat, referenceDate);
    const { time, ...rest } = treat;

    return {
      ...rest,
      date: treatDate.getTime(),
      freelibre_2h: false,
      freelibre_sgv: 0,
      freelibre_sgv_2h: 0,
    };
  });

  localStorage.setItem('treatments', JSON.stringify(result));

  return result;
};

export const addTreatmentToLocalStorage = (object: TreatmentUnion): void => {
  const existingArrayString = localStorage.getItem('treatments');
  let existingArray: any[] = [];

  if (existingArrayString) {
    existingArray = JSON.parse(existingArrayString);
  }
  const { date, ...rest } = object;
  const timestamp = new Date(date).getTime();

  existingArray.push({ ...rest, date: timestamp, identifier: `treat-${existingArray.length}` });

  existingArray.sort((a: Treatment, b: Treatment) => a.date - b.date);

  localStorage.setItem('treatments', JSON.stringify(existingArray));
};
