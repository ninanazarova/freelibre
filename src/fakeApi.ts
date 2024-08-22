import Entry from './models/EntryModel';
import Treatment from './models/TreatmentModel';
import dayjs from 'dayjs';
import { generateEntries, generateTreatments } from './fakeData';
import { IClient } from './api';
import Meal from './models/MealModel';
import Rapid from './models/RapidModel';
import Long from './models/LongModel';
import Exercise from './models/ExerciseModel';

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
      if (storedTreatments) {
        return JSON.parse(storedTreatments);
      }
      const startTime = dayjs().subtract(12, 'hour').valueOf();
      const endTime = dayjs().valueOf();
      const treatments = generateTreatments(startTime, endTime);

      localStorage.setItem('treatments', JSON.stringify(treatments));

      return treatments;
    } catch (error) {
      console.error(error);
    }
    return [];
  }
  public async postTreatment(
    formData: Meal | Rapid | Long | Exercise
  ): Promise<Response | undefined> {
    try {
    } catch (error) {
      console.error(error);
    }
    return undefined;
  }
  public async searchTreatments(searchString: string): Promise<Treatment[] | []> {
    try {
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
