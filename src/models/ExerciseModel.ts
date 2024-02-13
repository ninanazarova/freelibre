import { eventType } from './TreatmentModel';

interface Exercise {
  date: string; //*
  app: string; //* 'freelibre'
  eventType: eventType.EXERCISE;
  duration: number;
  notes: string;
}

export default Exercise;
