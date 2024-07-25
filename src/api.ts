import axios from 'axios';
import Entry from './models/EntryModel';
import { sgvToMbg } from './helpers';
import Meal from './models/MealModel';
import Rapid from './models/RapidModel';
import Long from './models/LongModel';
import Exercise from './models/ExerciseModel';
import Treatment from './models/TreatmentModel';
import dayjs from 'dayjs';

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

export class Client {
  private refreshToken: string;
  private baseUrl: string;
  private accessToken: AccessToken;

  constructor(refreshToken: string, baseUrl: string) {
    this.baseUrl = baseUrl;
    this.refreshToken = refreshToken;
    this.accessToken = { tokenString: '', expiresAt: null };
  }

  public setAuth({ baseUrl, refreshToken }: { baseUrl: string; refreshToken: string }) {
    this.baseUrl = baseUrl;
    this.refreshToken = refreshToken;
  }

  public async authorize(): Promise<AccessToken | null> {
    const url = this.baseUrl + `/api/v2/authorization/request/${this.refreshToken}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return {
        tokenString: data.token,
        expiresAt: new Date(data.exp * 1000),
      };
    } catch (e) {
      console.error(`Authorize NightScout token failed: ${e}`);
      return null;
    }
  }
  private async refreshAccessToken(): Promise<AccessToken> {
    if (this.accessToken.expiresAt !== null && this.accessToken.expiresAt > new Date()) {
      return this.accessToken;
    }

    const newToken = await this.authorize();
    if (newToken) {
      this.accessToken = newToken;
    }

    return this.accessToken;
  }

  public async getEntriesForTreatment(
    treatmentDate: number,
    hoursInterval: number = 12
  ): Promise<Entry[] | []> {
    const token = await this.refreshAccessToken();
    const url = this.baseUrl + `/api/v3/entries`;

    const half = (hoursInterval * 60) / 2;
    const before = +dayjs(treatmentDate).subtract(half, 'minutes');
    const after = +dayjs(treatmentDate).add(half, 'minutes');

    try {
      const {
        data: { result },
      } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token.tokenString}`,
        },
        params: {
          date$gte: before,
          sort: 'date',
          fields: 'date,identifier,sgv',
        },
      });

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
    const token = await this.refreshAccessToken();
    const url = this.baseUrl + `/api/v3/entries`;

    try {
      const {
        data: { result },
      } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token.tokenString}`,
        },
        params: {
          date$gte: getFromTime(),
          sort: 'date',
          fields: 'date,direction,identifier,sgv',
        },
      });

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
    const token = await this.refreshAccessToken();
    const url = this.baseUrl + `/api/v3/treatments`;

    try {
      const {
        data: { result },
      } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token.tokenString}`,
        },
        params: {
          notes$re: '(?i)' + encodeURIComponent(`${searchString}`) + '(?-i)',
          sort$desc: 'date',
        },
      });

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
    const token = await this.refreshAccessToken();
    const url = this.baseUrl + `/api/v3/treatments`;

    const half = (hoursInterval * 60) / 2;
    const before = +dayjs(treatmentDate).subtract(half, 'minutes');
    const after = +dayjs(treatmentDate).add(half, 'minutes');

    try {
      const {
        data: { result },
      } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token.tokenString}`,
        },
        params: {
          date$gte: before,
          sort$desc: 'date',
        },
      });

      const treatments = result.filter((t: any) => t.date <= after);

      return treatments;
    } catch (error) {
      console.error(error);
    }
    return [];
  }
  public async getTreatments(): Promise<Treatment[] | []> {
    const token = await this.refreshAccessToken();
    const url = this.baseUrl + `/api/v3/treatments`;

    try {
      const {
        data: { result },
      } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token.tokenString}`,
        },
        params: {
          date$gte: getFromTime(),
          sort$desc: 'date',
        },
      });

      return result;
    } catch (error) {
      console.error(error);
    }
    return [];
  }
  public async getTreatment(id: string): Promise<Treatment | null> {
    const token = await this.refreshAccessToken();
    const url = this.baseUrl + `/api/v3/treatments/${id}`;

    try {
      const {
        data: { result },
      } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token.tokenString}`,
        },
      });

      return result;
    } catch (error) {
      console.error(error);
    }
    return null;
  }
  public async postTreatment(
    formData: Meal | Rapid | Long | Exercise
  ): Promise<Response | undefined> {
    const token = await this.refreshAccessToken();
    const url = this.baseUrl + `/api/v3/treatments`;

    try {
      const response = await axios.post(url, formData, {
        headers: { Authorization: `Bearer ${token.tokenString}` },
      });

      return response.data;
    } catch (error) {
      console.error(error);
    }
    return undefined;
  }
}

const client = new Client(
  localStorage.getItem('refresh_token') as string,
  localStorage.getItem('base_url') as string
);

export default client;
