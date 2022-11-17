import { useTheme } from '@emotion/react';
import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import LoadingSpinner from './components/general/loading-spinner';
import AppBodySection from './components/appbody-section';
import AppLayout from './layout/AppLayout';

const addLoadingTime = (page: string, time: number) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(import(`./pages/${page}`)), time);
  });

/* @ts-expect-error */
const RephrasePage = lazy(() => addLoadingTime('RephrasePage', 100));
/* @ts-expect-error */
const ProcessPage = lazy(() => addLoadingTime('ProcessPage', 100));
/* @ts-expect-error */
const DocumentationPage = lazy(() => addLoadingTime('DocumentationPage', 100));
/* @ts-expect-error */
const AboutMePage = lazy(() => addLoadingTime('AboutMePage', 100));
/* @ts-expect-error */
const Page404 = lazy(() => addLoadingTime('404', 0));

const LoadingScreen = () => {
  const theme = useTheme();
  return (
    <AppBodySection backgroundColor={theme.palette.background.dark}>
      <div
        style={{
          height: 'calc(100vh - 437px)',
          display: 'flex',
          paddingTop: '40px',
          paddingLeft: '5px',
        }}
      >
        <LoadingSpinner />
      </div>
    </AppBodySection>
  );
};

interface AppRouteProps {
  target: JSX.Element;
}

const AppRoute = (props: AppRouteProps) => {
  const { target } = props;
  return <Suspense fallback={<LoadingScreen />}>{target}</Suspense>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='' element={<AppLayout />}>
        <Route path='*' element={<Page404 />} />
        <Route index element={<AppRoute target={<RephrasePage />} />} />
        <Route
          path='documentation'
          element={<AppRoute target={<DocumentationPage />} />}
        />
        <Route path='process' element={<AppRoute target={<ProcessPage />} />} />
        <Route
          path='about-me'
          element={<AppRoute target={<AboutMePage />} />}
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
