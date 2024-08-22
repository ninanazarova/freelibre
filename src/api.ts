import Entry from './models/EntryModel';
import { sgvToMbg } from './helpers';
import Meal from './models/MealModel';
import Rapid from './models/RapidModel';
import Long from './models/LongModel';
import Exercise from './models/ExerciseModel';
import Treatment from './models/TreatmentModel';
import dayjs from 'dayjs';
import { storage } from './storage';
import { FakeClient } from './fakeApi';

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

function getFromTime() {
  const hoursInterval = 12;
  const to = new Date().getTime();
  const from = to - hoursInterval * 60 * 60 * 1000;
  return from;
}
export interface IClient {
  authorize(password: string): Promise<AccessToken>;
  getEntries(): Promise<Entry[] | []>;
  getTreatments(): Promise<Treatment[] | []>;
  postTreatment(formData: Meal | Rapid | Long | Exercise): Promise<Response | undefined>;
  searchTreatments(searchString: string): Promise<Treatment[] | []>;
  getTreatment(id: string): Promise<Treatment | null>;
  getEntriesForTreatment(treatmentDate: number, hoursInterval: number): Promise<Entry[] | []>;
  getTreatmentsForTreatment(
    treatmentDate: number,
    hoursInterval: number
  ): Promise<Treatment[] | []>;
}

class Client implements IClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public async authorize(password: string): Promise<AccessToken> {
    const url = this.baseUrl + `/api/v2/authorization/request/${password}`;
    try {
      const response = await fetch(url);

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      return {
        tokenString: data.token,
        expiresAt: new Date(data.exp * 1000),
      };
    } catch (error) {
      throw new Error('Unauthorized');
    }
  }

  private async request(url: string, options: RequestInit = {}): Promise<any> {
    const token = storage.getToken();
    const headers = new Headers(options.headers);

    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
    }
    headers.append('Content-Type', 'application/json');

    const response = await fetch(`${this.baseUrl}${url}`, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      storage.clear();
      window.location.href = '/login';
      throw new Error('Unauthorized');
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  public async getEntriesForTreatment(
    treatmentDate: number,
    hoursInterval: number = 12
  ): Promise<Entry[] | []> {
    const half = (hoursInterval * 60) / 2;
    const before = +dayjs(treatmentDate).subtract(half, 'minutes');
    const after = +dayjs(treatmentDate).add(half, 'minutes');
    const params = new URLSearchParams({
      date$gte: before.toString(),
      sort: 'date',
      fields: 'date,identifier,sgv',
    });

    try {
      const { result } = await this.request('/api/v3/entries?' + params.toString());

      const entries = result
        .filter((e: any) => e.date <= after)
        .map((e: any) => ({ ...e, mbg: sgvToMbg(e.sgv) }));

      return entries;
    } catch (error) {
      console.error(error);
    }
    return [];
  }
  public async getEntries(): Promise<Entry[] | []> {
    const params = new URLSearchParams({
      date$gte: getFromTime().toString(),
      sort: 'date',
      fields: 'date,direction,identifier,sgv',
    });

    try {
      const { result } = await this.request('/api/v3/entries?' + params.toString());
      const entries = result.map((entry: Entry) => ({
        ...entry,
        mbg: sgvToMbg(entry.sgv),
      }));

      return entries;
    } catch (error) {
      console.error(error);
    }
    return [];
  }
  public async searchTreatments(searchString: string): Promise<Treatment[] | []> {
    const params = new URLSearchParams({
      notes$re: '(?i)' + encodeURIComponent(`${searchString}`) + '(?-i)',
      sort$desc: 'date',
    });

    try {
      const { result } = await this.request('/api/v3/treatments?' + params.toString());

      return result;
    } catch (error) {
      console.error(error);
    }
    return [];
  }
  public async getTreatmentsForTreatment(
    treatmentDate: number,
    hoursInterval: number = 12
  ): Promise<Treatment[] | []> {
    const half = (hoursInterval * 60) / 2;
    const before = +dayjs(treatmentDate).subtract(half, 'minutes');
    const after = +dayjs(treatmentDate).add(half, 'minutes');
    const params = new URLSearchParams({
      date$gte: before.toString(),
      sort$desc: 'date',
    });

    try {
      const { result } = await this.request('/api/v3/treatments?' + params.toString());

      const treatments = result.filter((t: any) => t.date <= after);

      return treatments;
    } catch (error) {
      console.error(error);
    }
    return [];
  }
  public async getTreatments(): Promise<Treatment[] | []> {
    const params = new URLSearchParams({
      date$gte: getFromTime().toString(),
      sort$desc: 'date',
    });

    try {
      const { result } = await this.request('/api/v3/treatments?' + params.toString());

      return result;
    } catch (error) {
      console.error(error);
    }
    return [];
  }
  public async getTreatment(id: string): Promise<Treatment | null> {
    try {
      const { result } = await this.request(`/api/v3/treatments/${id}`);

      return result;
    } catch (error) {
      console.error(error);
    }
    return null;
  }
  public async postTreatment(
    formData: Meal | Rapid | Long | Exercise
  ): Promise<Response | undefined> {
    try {
      const response = await this.request('/api/v3/treatments', {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      return response;
    } catch (error) {
      console.error(error);
    }
    return undefined;
  }
}

export const createClient = (baseUrl: string, useMock: boolean = false): IClient => {
  return useMock ? new FakeClient(baseUrl) : new Client(baseUrl);
};

let globalClient: IClient | null = null;

export const setGlobalClient = (client: IClient | null) => {
  globalClient = client;
};

export const getGlobalClient = (): IClient => {
  if (!globalClient) {
    throw new Error('API client is not initialized');
  }
  return globalClient;
};
