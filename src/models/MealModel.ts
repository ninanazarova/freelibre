import { eventType } from '../helpers';

interface Meal {
  date: string; //* ISO
  app: string; //* 'freelibre'
  eventType: eventType.MEAL; //Meal Bolus
  carbs: number;
  protein: number;
  fat: number;
  insulin: number;
  preBolus: number; // How many minutes the bolus was given before the meal started.
  notes: string;
}

export default Meal;
