import { eventType } from '../helpers';

interface Long {
  date: string; //* ISO
  app: string; //* 'freelibre'
  eventType: eventType.LONG_ACTING;
  insulin: number;
  notes: string;
}

export default Long;
