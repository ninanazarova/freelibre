import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/inter';
import './index.css';
import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
} from 'react-router-dom';
import Root from './routes/Root';
import Search from './routes/Search';
import ErrorPage from './ErrorPage';
import Index from './routes/Index';
import Settings from './routes/Settings';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Root />} errorElement={<ErrorPage />} path='/'>
      <Route element={<Index />} index />
      <Route element={<Search />} path='search' />
      <Route element={<Settings />} path='settings' />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
