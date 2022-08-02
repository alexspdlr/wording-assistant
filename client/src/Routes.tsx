import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoadingSpinner from './components/general/loading-spinner';
import Section from './components/section';
import AppLayout from './layout/AppLayout';

const addLoadingTime = (page: string, time: number) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(import(`./pages/${page}`)), time);
  });

/* @ts-expect-error */
const RephrasePage = lazy(() => addLoadingTime('RephrasePage', 300));
/* @ts-expect-error */
const ProcessPage = lazy(() => addLoadingTime('ProcessPage', 150));
/* @ts-expect-error */
const DocumentationPage = lazy(() => addLoadingTime('DocumentationPage', 150));
/* @ts-expect-error */
const TechStackPage = lazy(() => addLoadingTime('TechStackPage', 150));
/* @ts-expect-error */
const Page404 = lazy(() => addLoadingTime('404', 0));

const LoadingScreen = () => (
  <Section backgroundColor='#f7f7f7'>
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
  </Section>
);

interface AppRouteProps {
  target: JSX.Element;
}

const AppRoute = (props: AppRouteProps) => {
  const { target } = props;
  return <Suspense fallback={<LoadingScreen />}>{target}</Suspense>;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<AppLayout />}>
          <Route path='*' element={<Page404 />} />
          <Route index element={<AppRoute target={<RephrasePage />} />} />
          <Route
            path='documentation'
            element={<AppRoute target={<DocumentationPage />} />}
          />
          <Route
            path='process'
            element={<AppRoute target={<ProcessPage />} />}
          />
          <Route
            path='tech-stack'
            element={<AppRoute target={<TechStackPage />} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
