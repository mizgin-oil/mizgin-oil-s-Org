
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MapPin, Phone, Instagram, Facebook, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { OWNER_INFO, BRAND_LOGO_URL } from '../constants';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Experience' },
    { path: '/services', label: 'Services' },
    { path: '/about', label: 'Legacy' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-brand-main selection:text-white">
      {/* Header */}
      <header 
        className={`fixed w-full z-40 transition-all duration-500 ${
          scrolled ? 'py-4' : 'py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav 
            className={`transition-all duration-500 rounded-full px-4 sm:px-8 flex justify-between items-center ${
              scrolled ? 'glass shadow-2xl border border-white/20' : 'bg-transparent'
            }`}
          >
            <Link to="/" className="flex items-center group py-2">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <img 
                  src={BRAND_LOGO_URL} 
                  alt="MIZGIN OIL" 
                  className={`h-10 sm:h-12 w-auto transition-all duration-500 object-contain ${
                    scrolled ? 'scale-90 brightness-100' : 'scale-100 brightness-0 invert'
                  } ${location.pathname !== '/' && !scrolled ? 'brightness-100' : ''}`}
                />
                <div className="flex flex-col -space-y-1">
                  <span className={`text-lg sm:text-xl font-black tracking-tighter transition-colors duration-500 ${
                    scrolled || location.pathname !== '/' ? 'text-brand-dark' : 'text-white'
                  }`}>
                    MIZGIN<span className="text-brand-main">OIL</span>
                  </span>
                  <span className={`text-[7px] sm:text-[8px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] opacity-40 transition-colors duration-500 ${
                    scrolled || location.pathname !== '/' ? 'text-brand-dark' : 'text-white'
                  }`}>
                    Duhok
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 relative group overflow-hidden ${
                    location.pathname === link.path 
                      ? (scrolled || location.pathname !== '/' ? 'text-brand-main' : 'text-white')
                      : (scrolled || location.pathname !== '/' ? 'text-brand-gray hover:text-brand-dark' : 'text-white/70 hover:text-white')
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  {location.pathname === link.path && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute inset-0 bg-brand-main/10 rounded-full -z-0"
                    />
                  )}
                </Link>
              ))}
              <a 
                href="#location"
                className="ml-6 px-7 py-3 bg-brand-main text-white text-[11px] font-black rounded-full hover:shadow-[0_0_25px_rgba(131,174,55,0.4)] transition-all uppercase tracking-widest"
              >
                Visit Hub
              </a>
            </div>

            {/* Mobile Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 rounded-full transition-colors ${
                scrolled || location.pathname !== '/' ? 'text-brand-dark hover:bg-brand-gray/10' : 'text-white hover:bg-white/10'
              }`}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </nav>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-24 inset-x-4 glass shadow-3xl rounded-3xl p-6 border border-white/20"
            >
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-4 py-4 rounded-2xl text-lg font-black transition-all ${
                      location.pathname === link.path 
                        ? 'bg-brand-main text-white' 
                        : 'text-brand-gray hover:bg-brand-main/10'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="bg-brand-dark text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-main/5 blur-[120px] rounded-full -mr-48 -mt-48" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
            <div className="md:col-span-2">
              <Link to="/" className="inline-flex items-center space-x-6 mb-10 group">
                <img 
                  src={BRAND_LOGO_URL} 
                  alt="MIZGIN OIL" 
                  className="h-20 w-auto object-contain brightness-0 invert"
                />
                <div className="flex flex-col">
                  <span className="text-3xl font-black tracking-tighter uppercase block">
                    MIZGIN<span className="text-brand-main">OIL</span>
                  </span>
                  <span className="text-[10px] font-bold text-brand-main uppercase tracking-[0.5em]">The Elite Choice</span>
                </div>
              </Link>
              <p className="text-brand-gray text-xl max-w-md font-light leading-relaxed">
                Elevating the fueling experience in Duhok through precision, quality, and an unwavering commitment to our community.
              </p>
            </div>
            
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-main mb-8">Concierge</h4>
              <ul className="space-y-5 text-brand-gray font-medium">
                <li><Link to="/services" className="hover:text-white transition-colors">Elite Services</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">Our Heritage</Link></li>
                <li><a href="#location" className="hover:text-white transition-colors">Location Details</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-main mb-8">Connect</h4>
              <div className="flex space-x-5 mb-10">
                <a href="#" className="w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center hover:bg-brand-main hover:border-brand-main transition-all duration-500">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center hover:bg-brand-main hover:border-brand-main transition-all duration-500">
                  <Instagram className="h-6 w-6" />
                </a>
              </div>
              <div className="space-y-4">
                <p className="text-brand-gray text-sm font-bold flex items-center">
                  <Phone className="h-4 w-4 mr-4 text-brand-main" />
                  {OWNER_INFO.phone}
                </p>
                <p className="text-brand-gray text-sm font-bold flex items-center">
                  <MapPin className="h-4 w-4 mr-4 text-brand-main" />
                  {OWNER_INFO.location}
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] text-brand-gray font-black uppercase tracking-[0.4em]">
            <span>&copy; {new Date().getFullYear()} MIZGIN OIL. All Rights Reserved.</span>
            
            <div className="mt-6 md:mt-0 flex items-center space-x-10">
              <span className="opacity-40">Duhok Excellence Since 2005</span>
              <Link 
                to="/admin" 
                className="flex items-center space-x-3 text-brand-main/60 hover:text-brand-main transition-all group"
              >
                <Lock className="h-3 w-3 transition-transform group-hover:scale-110" />
                <span>Admin</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
