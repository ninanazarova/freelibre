import { eventType } from './TreatmentModel';

interface Long {
  date: string; //* ISO
  app: string; //* 'freelibre'
  eventType: eventType.LONG_ACTING;
  insulin: number;
  notes: string;
}

export default Long;
