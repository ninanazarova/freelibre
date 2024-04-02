import React, { ReactNode, StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/inter';
import './index.css';
import { createBrowserRouter, Navigate, RouterProvider, useLocation } from 'react-router-dom';
import LoginPage from './routes/LoginPage';
import App from './routes/App';
import ErrorPage from './ErrorPage';
import Index, { loader as indexLoader } from './routes/Index';
import Search, { loader as searchLoader } from './routes/Search';
import New from './routes/New';
import MealForm, { action as mealFormAction } from './components/MealForm';
import RapidForm, { action as rapidFormAction } from './components/RapidForm';
import LongForm, { action as longFormAction } from './components/LongForm';
import ExerciseForm, { action as exerciseFormAction } from './components/ExerciseForm';
import Treatment, { loader as treatmentLoader } from './routes/Treatment';
import Settings from './routes/Settings';
import NightscoutUrl from './routes/NightscoutUrl';
import RefreshToken from './routes/RefreshToken';

import { AuthProvider, useAuth } from './SetupContext';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return isAuthenticated ? (
    <div>{children}</div>
  ) : (
    <Navigate to='/login' state={{ from: location }} />
  );
};

const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
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
          { path: 'settings/refresh-token', element: <RefreshToken /> },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
