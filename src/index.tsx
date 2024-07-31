import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/inter';
import './index.css';
import { createBrowserRouter, Outlet, redirect, RouterProvider } from 'react-router-dom';
import LoginPage, { action as loginAction } from './routes/LoginPage';
import App from './routes/App';
import ErrorPage from './ErrorPage';
import Overview, { loader as overviewLoader } from './routes/Overview';
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
import { authProvider, protectedLoader } from './auth';

function Index() {
  return <Outlet />;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
    errorElement: <ErrorPage />,
    loader: async () => {
      const isAuthenticated = await authProvider.checkAuth();
      return isAuthenticated ? redirect('/overview') : redirect('/login');
    },
  },
  {
    path: 'login',
    element: <LoginPage />,
    action: loginAction,
    loader: async () => {
      const isAuthenticated = await authProvider.checkAuth();
      return isAuthenticated ? redirect('/overview') : null;
    },
  },
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: 'overview', element: <Overview />, loader: protectedLoader(overviewLoader) },
      { path: 'new', element: <New /> },
      { path: 'new/meal', element: <MealForm />, action: mealFormAction },
      { path: 'new/rapid', element: <RapidForm />, action: rapidFormAction },
      { path: 'new/long', element: <LongForm />, action: longFormAction },
      { path: 'new/exercise', element: <ExerciseForm />, action: exerciseFormAction },
      { path: 'search', element: <Search />, loader: protectedLoader(searchLoader) },
      {
        path: 'search/:treatmentId',
        element: <Treatment />,
        loader: protectedLoader(treatmentLoader),
      },
      { path: 'settings', element: <Settings /> },
      { path: 'settings/nightscout-url', element: <NightscoutUrl /> },
      { path: 'settings/refresh-token', element: <RefreshToken /> },
    ],
  },
]);

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
