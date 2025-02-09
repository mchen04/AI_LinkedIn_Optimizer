import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Router,
  RouterProvider,
  Route,
  RootRoute,
} from '@tanstack/react-router';
import App from './App';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { UploadPage } from './pages/UploadPage';
import { AnalysisPage } from './pages/AnalysisPage';
import './index.css';

const rootRoute = new RootRoute({
  component: App,
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
});

const uploadRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/upload',
  component: UploadPage,
});

const analysisRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/analysis',
  component: AnalysisPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  uploadRoute,
  analysisRoute,
]);

const router = new Router({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
