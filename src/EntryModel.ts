type Entry = {
  type: string;
  dateString: string;
  date: number;
  sgv: number;
  direction: string;
  noise: number;
  filtered: number;
  unfiltered: number;
  rssi: number;
};

export default Entry;
