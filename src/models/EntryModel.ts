type Entry = {
  date: number;
  direction: Direction;
  identifier: string;
  sgv: number;
  mbg: number | null;
};

export enum Direction {
  DoubleDown = 'DoubleDown',
  SingleDown = 'SingleDown',
  FortyFiveDown = 'FortyFiveDown',
  Flat = 'Flat',
  FortyFiveUp = 'FortyFiveUp',
  SingleUp = 'SingleUp',
  DoubleUp = 'DoubleUp',
}

export default Entry;
