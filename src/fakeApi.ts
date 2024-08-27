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

      const isTimeInRange = (treatmentDate: number) => {
        return treatmentDate >= startTime && treatmentDate <= endTime;
      };

      return treatments
        .filter((treat: Treatment) => isTimeInRange(treat.date))
        .sort((a: Treatment, b: Treatment) => a.date - b.date);
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
      }

      return treatments.filter((treat: Treatment) =>
        treat.notes.toLowerCase().includes(searchString.toLowerCase())
      );
    } catch (error) {
      console.error(error);
    }
    return [];
  }
  public async getTreatment(id: string): Promise<Treatment | null> {
    try {
    } catch (error) {
      console.error(error);
    }
    return null;
  }
  public async getEntriesForTreatment(
    treatmentDate: number,
    hoursInterval: number
  ): Promise<Entry[] | []> {
    try {
    } catch (error) {
      console.error(error);
    }
    return [];
  }
  public async getTreatmentsForTreatment(
    treatmentDate: number,
    hoursInterval: number
  ): Promise<Treatment[] | []> {
    try {
    } catch (error) {
      console.error(error);
    }
    return [];
  }
}
