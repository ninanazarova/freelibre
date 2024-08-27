import Entry from './models/EntryModel';
import Treatment, { TreatmentUnion } from './models/TreatmentModel';
import dayjs from 'dayjs';
import { addTreatmentToLocalStorage, generateEntries, generateTreatments } from './fakeData';
import { IClient } from './api';

type AccessToken = {
  tokenString: string;
  expiresAt: Date | null;
};
type Response = {
  status: number;
  identifier?: string;
  isDeduplication?: boolean;
  deduplicatedIdentifier?: string;
};

export class FakeClient implements IClient {
  private baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public async authorize(password: string): Promise<AccessToken> {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return { tokenString: password, expiresAt: tomorrow };
  }

  public async getEntries(): Promise<Entry[] | []> {
    try {
      await new Promise((r) => setTimeout(r, 500));

      const storedEntries = localStorage.getItem('entries');
      if (storedEntries) {
        return JSON.parse(storedEntries);
      }

      const startTime = dayjs().subtract(12, 'hour').valueOf();
      const endTime = dayjs().valueOf();
      const interval = 3 * 60 * 1000;
      const entries = generateEntries(startTime, endTime, interval, 110, 240);

      localStorage.setItem('entries', JSON.stringify(entries));

      return entries;
    } catch (error) {
      console.error(error);
    }
    return [];
  }

  public async getTreatments(): Promise<Treatment[] | []> {
    try {
      await new Promise((r) => setTimeout(r, 500));
      const storedTreatments = localStorage.getItem('treatments');
      let treatments;
      if (storedTreatments) {
        treatments = JSON.parse(storedTreatments);
      } else {
        treatments = generateTreatments();
      }

      const startTime = dayjs().subtract(12, 'hour').valueOf();
      const endTime = dayjs().valueOf();

      return treatments.filter((treat: Treatment) => isTimeInRange(treat.date, startTime, endTime));
    } catch (error) {
      console.error(error);
    }
    return [];
  }
  public async postTreatment(formData: TreatmentUnion): Promise<Response | undefined> {
    try {
      await new Promise((r) => setTimeout(r, 500));
      addTreatmentToLocalStorage(formData);
    } catch (error) {
      console.error(error);
    }
    return undefined;
  }
  public async searchTreatments(searchString: string): Promise<Treatment[] | []> {
    try {
      await new Promise((r) => setTimeout(r, 500));
      const storedTreatments = localStorage.getItem('treatments');
      let treatments;
      if (storedTreatments) {
        treatments = JSON.parse(storedTreatments);

        return treatments.filter((treat: Treatment) =>
          treat.notes.toLowerCase().includes(searchString.toLowerCase())
        );
      }
    } catch (error) {
      console.error(error);
    }
    return [];
  }
  public async getTreatment(id: string): Promise<Treatment | null> {
    try {
      await new Promise((r) => setTimeout(r, 500));
      const storedTreatments = localStorage.getItem('treatments');
      let treatments;
      if (storedTreatments) {
        treatments = JSON.parse(storedTreatments);

        return treatments.find((treat: Treatment) => treat.identifier === id);
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  }
  public async getEntriesForTreatment(
    treatmentDate: number,
    hoursInterval: number = 12
  ): Promise<Entry[] | []> {
    try {
      await new Promise((r) => setTimeout(r, 500));
      const half = (hoursInterval * 60) / 2;
      const before = +dayjs(treatmentDate).subtract(half, 'minutes');
      const after = +dayjs(treatmentDate).add(half, 'minutes');
      const interval = 3 * 60 * 1000;
      const entries = generateEntries(before, after, interval, 110, 240);
      return entries;
    } catch (error) {
      console.error(error);
    }
    return [];
  }
  public async getTreatmentsForTreatment(
    treatmentDate: number,
    hoursInterval: number = 12
  ): Promise<Treatment[] | []> {
    try {
      await new Promise((r) => setTimeout(r, 500));
      const storedTreatments = localStorage.getItem('treatments');
      let treatments;
      if (storedTreatments) {
        treatments = JSON.parse(storedTreatments);

        const half = (hoursInterval * 60) / 2;
        const before = +dayjs(treatmentDate).subtract(half, 'minutes');
        const after = +dayjs(treatmentDate).add(half, 'minutes');

        return treatments.filter((treat: Treatment) => isTimeInRange(treat.date, before, after));
      }
    } catch (error) {
      console.error(error);
    }
    return [];
  }
}

const isTimeInRange = (treatmentDate: number, startTime: number, endTime: number) => {
  return treatmentDate >= startTime && treatmentDate <= endTime;
};
