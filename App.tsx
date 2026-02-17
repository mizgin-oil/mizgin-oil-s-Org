import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AdminProvider } from './contexts/AdminContext';
import { motion } from 'framer-motion';

// Lazy load pages for performance
const HomePage = lazy(() => import('./pages/HomePage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));

const LoadingFallback = () => (
  <div className="h-screen flex items-center justify-center bg-brand-light">
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center">
        <div className="w-56 h-1 bg-brand-gray/10 rounded-full overflow-hidden relative mb-8">
          <motion.div 
            initial={{ left: '-100%' }}
            animate={{ left: '100%' }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 bottom-0 w-1/2 bg-brand-main"
          />
        </div>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-brand-dark font-black uppercase tracking-[0.6em] text-[12px] text-center"
        >
          MIZGIN <span className="text-brand-main">OIL</span>
        </motion.p>
        <p className="mt-3 text-[10px] font-bold text-brand-gray uppercase tracking-[0.3em] opacity-40">
          Refining Excellence
        </p>
      </div>
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
