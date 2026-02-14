
import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AdminProvider } from './contexts/AdminContext';

// Lazy load pages for performance
const HomePage = lazy(() => import('./pages/HomePage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));

const LoadingFallback = () => (
  <div className="h-screen flex items-center justify-center bg-brand-light">
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 border-4 border-brand-main border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-brand-gray font-medium uppercase tracking-widest text-xs">Loading MIZGIN OIL...</p>
    </div>
  </div>
);

function App() {
  return (
    <AdminProvider>
      <Router>
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </AdminProvider>
  );
}

export default App;
