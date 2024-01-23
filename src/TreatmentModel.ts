type Treatment = {
  _id: string;
  eventType: string;
  created_at: string;
  glucose: string;
  glucoseType: string;
  carbs: number;
  protein: number;
  fat: number;
  insulin: number;
  units: string;
  transmitterId: string;
  sensorCode: string;
  notes: string;
  enteredBy: string;
};

export default Treatment;
