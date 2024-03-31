interface TreatmentModel {
  identifier: string;
  date: number; //*
  utcOffset: number;
  app: string; //*
  device: string;
  subject: string;
  modifiedBy: string;
  isValid: boolean;
  isReadOnly: boolean;
  eventType: eventType;
  glucose: string;
  glucoseType: string; // example: "Sensor", "Finger", "Manual"
  units: string; // example: "mg/dl", "mmol/l"
  carbs: number;
  protein: number;
  fat: number;
  insulin: number;
  duration: number;
  preBolus: number;
  splitNow: number;
  splitExt: number;
  percent: number;
  absolute: number;
  targetTop: number;
  targetBottom: number;
  profile: string;
  reason: string;
  notes: string;
  enteredBy: string;

  freelibre_2h: boolean;
  freelibre_sgv: number;
  freelibre_sgv_2h: number;
}

export enum eventType {
  MEAL = 'Meal Bolus',
  RAPID_ACTING = 'Correction Bolus',
  LONG_ACTING = 'Carb Correction',
  EXERCISE = 'Exercise',
}

export default TreatmentModel;

// all eventTypes: "BG Check", "Snack Bolus", "Meal Bolus", "Correction Bolus", "Carb Correction", "Combo Bolus", "Announcement", "Note", "Question", "Exercise", "Site Change", "Sensor Start", "Sensor Change", "Pump Battery Change", "Insulin Change", "Temp Basal", "Profile Switch", "D.A.D. Alert", "Temporary Target", "OpenAPS Offline", "Bolus Wizard"

// JSON data to post
// {
//   "identifier": "53409478-105f-11e9-ab14-d663bd873d93",
//   "date": 1532936118000,
//   "utcOffset": 120,
//   "carbs": 10,
//   "insulin": 1,
//   "eventType": "Snack Bolus",
//   "app": "xdrip",
//   "subject": "uploader"
// }
