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
      { path: 'new', element: <New />, loader: protectedLoader() },
      {
        path: 'new/meal',
        element: <MealForm />,
        loader: protectedLoader(),
        action: mealFormAction,
      },
      {
        path: 'new/rapid',
        element: <RapidForm />,
        loader: protectedLoader(),
        action: rapidFormAction,
      },
      {
        path: 'new/long',
        element: <LongForm />,
        loader: protectedLoader(),
        action: longFormAction,
      },
      {
        path: 'new/exercise',
        element: <ExerciseForm />,
        loader: protectedLoader(),
        action: exerciseFormAction,
      },
      { path: 'search', element: <Search />, loader: protectedLoader(searchLoader) },
      {
        path: 'search/:treatmentId',
        element: <Treatment />,
        loader: protectedLoader(treatmentLoader),
      },
      { path: 'settings', element: <Settings />, loader: protectedLoader() },
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
