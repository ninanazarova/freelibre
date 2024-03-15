import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/inter';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root';
import Search from './routes/Search';
import ErrorPage from './ErrorPage';
import Index, { loader as indexLoader } from './routes/Index';
import Settings from './routes/Settings';
import Treatment from './routes/Treatment';
import MealForm, { action as mealFormAction } from './components/MealForm';

import ExerciseForm from './components/ExerciseForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '*',
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index />, loader: indexLoader },
          { path: 'treatment', element: <Treatment /> },
          { path: 'treatment/meal', element: <MealForm />, action: mealFormAction },
          { path: 'treatment/exercise', element: <ExerciseForm /> },
          { path: 'search', element: <Search /> },
          { path: 'settings', element: <Settings /> },
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
