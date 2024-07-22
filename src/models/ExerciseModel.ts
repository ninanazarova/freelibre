import { eventType } from '../helpers';

interface Exercise {
  date: string; //* ISO
  app: string; //* 'freelibre'
  eventType: eventType.EXERCISE;
  duration: number;
  notes: string;
}

export default Exercise;
