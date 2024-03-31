import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/inter';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './routes/App';
import Search, { loader as searchLoader } from './routes/Search';
import ErrorPage from './ErrorPage';
import Index, { loader as indexLoader } from './routes/Index';
import Settings from './routes/Settings';
import New from './routes/New';
import MealForm, { action as mealFormAction } from './components/MealForm';
import RapidForm, { action as rapidFormAction } from './components/RapidForm';
import LongForm, { action as longFormAction } from './components/LongForm';
import ExerciseForm, { action as exerciseFormAction } from './components/ExerciseForm';
import Treatment, { loader as treatmentLoader } from './routes/Treatment';
import NightscoutUrl from './routes/NightscoutUrl';
import AccessToken from './routes/AccessToken';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '*',
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index />, loader: indexLoader },
          { path: 'new', element: <New /> },
          { path: 'new/meal', element: <MealForm />, action: mealFormAction },
          { path: 'new/rapid', element: <RapidForm />, action: rapidFormAction },
          { path: 'new/long', element: <LongForm />, action: longFormAction },
          { path: 'new/exercise', element: <ExerciseForm />, action: exerciseFormAction },
          { path: 'search', element: <Search />, loader: searchLoader },
          { path: 'search/:treatmentId', element: <Treatment />, loader: treatmentLoader },
          { path: 'settings', element: <Settings /> },
          { path: 'settings/nightscout-url', element: <NightscoutUrl /> },
          { path: 'settings/access-token', element: <AccessToken /> },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
