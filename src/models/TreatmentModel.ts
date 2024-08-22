import { eventType } from '../helpers';

interface TreatmentModel {
  identifier: string;
  date: number;
  app: string;
  eventType: eventType;
  carbs?: number;
  protein?: number;
  fat?: number;
  insulin?: number;
  duration?: number;
  preBolus?: number;
  notes: string;

  freelibre_2h: boolean;
  freelibre_sgv: number;
  freelibre_sgv_2h: number;
}

export default TreatmentModel;
