import { OverridableStringUnion } from '@mui/types';
import { ColorPaletteProp, TypographyPropsColorOverrides } from '@mui/joy';
import LongIcon from './assets/long.svg?react';
import RapidIcon from './assets/rapid.svg?react';
import FoodIcon from './assets/food.svg?react';
import ExerciseIcon from './assets/exercise.svg?react';

export const sgvToMbg = (sgv: number) => {
  return Math.round((sgv / 18) * 10) / 10;
};

export enum eventType {
  MEAL = 'Meal Bolus',
  RAPID_ACTING = 'Correction Bolus',
  LONG_ACTING = 'Carb Correction',
  EXERCISE = 'Exercise',
}

export const iconMap = {
  [eventType.MEAL]: FoodIcon,
  [eventType.EXERCISE]: ExerciseIcon,
  [eventType.RAPID_ACTING]: RapidIcon,
  [eventType.LONG_ACTING]: LongIcon,
};

export const titleMap = {
  [eventType.MEAL]: 'Meal',
  [eventType.EXERCISE]: 'Exercise',
  [eventType.RAPID_ACTING]: 'Rapid',
  [eventType.LONG_ACTING]: 'Long',
};

export const iconColorMap = {
  [eventType.MEAL]: 'var(--joy-palette-primary-500, #0B6BCB)',
  [eventType.EXERCISE]: 'var(--joy-palette-success-500, #1F7A1F)',
  [eventType.RAPID_ACTING]: 'var(--joy-palette-danger-500, #C41C1C)',
  [eventType.LONG_ACTING]: 'var(--joy-palette-warning-500, #9A5B13)',
};

export const typographyColorMap: {
  [key in eventType]: OverridableStringUnion<ColorPaletteProp, TypographyPropsColorOverrides>;
} = {
  [eventType.MEAL]: 'primary',
  [eventType.EXERCISE]: 'success',
  [eventType.RAPID_ACTING]: 'danger',
  [eventType.LONG_ACTING]: 'warning',
};
