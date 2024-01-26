import axios from 'axios';
import Entry from './EntryModel';
import Treatment from './TreatmentModel';

const TOKEN = process.env.REACT_APP_TOKEN;
const BASE_URL = process.env.REACT_APP_BASE_URL;

//gets entries between two timestamps and limits the maximum return values to 1440
const hoursInterval = 12;
const to = new Date().getTime();
const from = to - hoursInterval * 60 * 60 * 1000;

const headers = {
  'Content-Type': 'application/json',
};
const params = {
  token: TOKEN,
};
const chartParams = {
  'find[date][$gt]': from,
  'find[date][$lte]': to,
  count: '1400',
  token: TOKEN,
};

const getEntries = async (): Promise<Entry[] | []> => {
  const url = BASE_URL + `/entries`;
  try {
    const { data } = await axios.get(url, { headers, params: chartParams });

    const reversedData = data.reverse();
    return reversedData;
  } catch (error) {
    console.error(error);
  }
  return [];
};

const getTreatments = async (): Promise<Treatment[] | []> => {
  const url = BASE_URL + '/treatments?find[notes]=/exerc/i';
  try {
    const { data } = await axios.get(url, { headers, params });
    return data;
  } catch (error) {
    console.error(error);
  }
  return [];
};

export { getEntries, getTreatments };
