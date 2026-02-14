import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AdminProvider } from './contexts/AdminContext';
import { motion } from 'framer-motion';
import { Fuel } from 'lucide-react';

// Lazy load pages for performance
const HomePage = lazy(() => import('./pages/HomePage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));

const LoadingFallback = () => (
  <div className="h-screen flex items-center justify-center bg-brand-light">
    <div className="flex flex-col items-center">
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [1, 0.7, 1]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
        className="mb-8"
      >
        <Fuel className="h-20 w-20 text-brand-main drop-shadow-[0_0_15px_rgba(131,174,55,0.4)]" />
      </motion.div>
      <div className="flex flex-col items-center">
        <div className="w-48 h-1 bg-brand-gray/10 rounded-full overflow-hidden relative mb-4">
          <motion.div 
            initial={{ left: '-100%' }}
            animate={{ left: '100%' }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 bottom-0 w-1/2 bg-brand-main"
          />
        </div>
        <p className="text-brand-gray font-black uppercase tracking-[0.4em] text-[10px]">
          Mizgin <span className="text-brand-main">Oil</span>
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
