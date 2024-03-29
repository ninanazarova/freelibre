import { eventType } from './TreatmentModel';

interface Rapid {
  date: string; //* ISO
  app: string; //* 'freelibre'
  eventType: eventType.RAPID_ACTING;
  insulin: number;
  notes: string;
}

export default Rapid;
