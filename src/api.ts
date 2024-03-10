import axios from 'axios';
import Entry from './models/EntryModel';
import { calculate } from './helpers';
import Exercise from './models/ExerciseModel';
import Meal from './models/MealModel';
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

const TOKEN = process.env.REACT_APP_TOKEN as string;
const BASE_URL = process.env.REACT_APP_BASE_URL as string;

function getFromTime() {
  const hoursInterval = 12;
  const to = new Date().getTime();
  const from = to - hoursInterval * 60 * 60 * 1000;
  return from;
}

export class Client {
  private readonly accessToken: string;
  private readonly baseUrl: string;

  private authToken: AuthorizationToken;

  constructor(accessToken: string, baseUrl: string) {
    this.baseUrl = baseUrl;
    this.accessToken = accessToken;
    this.authToken = { tokenString: '', expiresAt: null };
  }

  private async authorize(): Promise<AuthorizationToken | void> {
    const url = this.baseUrl + `/api/v2/authorization/request/${this.accessToken}`;
    try {
      const { data } = await axios.get(url);
      return {
        tokenString: data.token,
        expiresAt: new Date(data.exp * 1000),
      };
    } catch (e) {
      console.error(`Authorize NightScout token failed: ${e}`);
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

    const url = BASE_URL + `/api/v3/entries`;

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
        mbg: calculate(entry.sgv),
      }));

      return entries;
    } catch (error) {
      console.error(error);
    }
    return [];
  }
  public async searchTreatments(searchString: string): Promise<Treatment[] | []> {
    const token = await this.refreshToken();

    const url = BASE_URL + `/api/v3/treatments`;

    try {
      const {
        data: { result },
      } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token.tokenString}`,
        },
        params: {
          notes$re: encodeURIComponent(`${searchString}`),
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

    const url = BASE_URL + `/api/v3/treatments`;

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

    const url = BASE_URL + `/api/v3/treatments/${id}`;

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

  public async postTreatment(formData: Exercise | Meal): Promise<Response | undefined> {
    const url = BASE_URL + `/api/v3/treatments`;

    try {
      const response = await axios.post(url, formData, {
        headers: { Authorization: `Bearer ${this.authToken.tokenString}` },
      });

      return response.data;
    } catch (error) {
      console.error(error);
    }
    return undefined;
  }
}

const client = new Client(TOKEN, BASE_URL);
export default client;
