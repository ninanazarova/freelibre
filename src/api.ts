import axios from 'axios';
import Entry from './models/EntryModel';
import { sgvToMbg } from './helpers';
import Meal from './models/MealModel';
import Rapid from './models/RapidModel';
import Long from './models/LongModel';
import Exercise from './models/ExerciseModel';
import Treatment from './models/TreatmentModel';

type AuthorizationToken = {
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
  private accessToken: string;
  private baseUrl: string;

  private authToken: AuthorizationToken;

  constructor(accessToken: string, baseUrl: string) {
    this.baseUrl = baseUrl;
    this.accessToken = accessToken;
    this.authToken = { tokenString: '', expiresAt: null };
  }

  setAuth({ baseUrl, accessToken }: { baseUrl: string; accessToken: string }) {
    this.baseUrl = baseUrl;
    this.accessToken = accessToken;
  }
  public async authorize(): Promise<AuthorizationToken | null> {
    const url = this.baseUrl + `/api/v2/authorization/request/${this.accessToken}`;
    try {
      const { data } = await axios.get(url);

      return {
        tokenString: data.token,
        expiresAt: new Date(data.exp * 1000),
      };
    } catch (e) {
      console.error(`Authorize NightScout token failed: ${e}`);
    } finally {
      return null;
    }
  }

  private async refreshToken(): Promise<AuthorizationToken> {
    if (this.authToken.expiresAt !== null && this.authToken.expiresAt > new Date()) {
      return this.authToken;
    }

    const newToken = await this.authorize();
    if (newToken) {
      this.authToken = newToken;
    }

    return this.authToken;
  }

  public async getEntries(): Promise<Entry[] | []> {
    const token = await this.refreshToken();
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
    const token = await this.refreshToken();
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
  public async getTreatments(): Promise<Treatment[] | []> {
    const token = await this.refreshToken();
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
    const token = await this.refreshToken();
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
    const token = await this.refreshToken();
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
  JSON.parse(localStorage.getItem('access_token') as string),
  JSON.parse(localStorage.getItem('base_url') as string)
);

export default client;
