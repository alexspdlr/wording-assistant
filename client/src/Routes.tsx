import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import DocumentationPage from './pages/DocumentationPage';
import ProcessPage from './pages/ProcessPage';
import RephrasePage from './pages/RephrasePage';
import TechStackPage from './pages/TechStackPage';
// import your route components too

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<RephrasePage />} />
          <Route path='documentation' element={<DocumentationPage />} />
          <Route path='process' element={<ProcessPage />} />
          <Route path='tech-stack' element={<TechStackPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
