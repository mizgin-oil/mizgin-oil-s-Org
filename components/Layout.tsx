
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MapPin, Phone, Instagram, Facebook, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { OWNER_INFO } from '../constants';

// Google Drive direct link for the logo provided by the user
const BRAND_LOGO_URL = "https://drive.google.com/uc?id=1ykt6ACQvAgHfSI7iNYBDrAI3epffWZ-T";

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
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled ? 'py-4' : 'py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav 
            className={`transition-all duration-500 rounded-full px-6 flex justify-between items-center ${
              scrolled ? 'glass shadow-2xl border border-white/20' : 'bg-transparent'
            }`}
          >
            <Link to="/" className="flex items-center space-x-3 group py-3">
              <div className="relative h-12 w-12 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                <img 
                  src={BRAND_LOGO_URL} 
                  alt="MIZGIN OIL Logo" 
                  className="h-full w-full object-contain filter drop-shadow-[0_4px_8px_rgba(131,174,55,0.3)]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.opacity = '0';
                  }}
                />
              </div>
              <div className="flex flex-col -space-y-1">
                <span className={`text-xl font-extrabold tracking-tighter transition-colors duration-500 ${
                  scrolled || location.pathname !== '/' ? 'text-brand-dark' : 'text-white'
                }`}>
                  MIZGIN<span className="text-brand-main">OIL</span>
                </span>
                <span className={`text-[8px] font-black uppercase tracking-[0.4em] opacity-40 transition-colors duration-500 ${
                  scrolled || location.pathname !== '/' ? 'text-brand-dark' : 'text-white'
                }`}>
                  Energy Hub
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 relative group overflow-hidden ${
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
                className="ml-4 px-6 py-2.5 bg-brand-main text-white text-xs font-bold rounded-full hover:shadow-[0_0_20px_rgba(131,174,55,0.4)] transition-all uppercase tracking-widest"
              >
                Visit Us
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
                    className={`px-4 py-3 rounded-2xl text-lg font-bold transition-all ${
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
      <footer className="bg-brand-dark text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-main/5 blur-[120px] rounded-full -mr-48 -mt-48" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <Link to="/" className="flex items-center space-x-4 mb-8 group">
                <div className="h-20 w-20 bg-white p-3 rounded-[2rem] shadow-[0_20px_40px_-10px_rgba(255,255,255,0.1)] flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                  <img 
                    src={BRAND_LOGO_URL} 
                    alt="MIZGIN OIL Logo" 
                    className="h-full w-full object-contain"
                  />
                </div>
                <div>
                  <span className="text-3xl font-black tracking-tighter uppercase block">
                    MIZGIN<span className="text-brand-main">OIL</span>
                  </span>
                  <span className="text-[10px] font-bold text-brand-main uppercase tracking-[0.5em]">The Elite Choice</span>
                </div>
              </Link>
              <p className="text-brand-gray text-lg max-w-md font-light leading-relaxed">
                Elevating the fueling experience in Duhok through precision, quality, and an unwavering commitment to our community.
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-brand-main mb-6">Concierge</h4>
              <ul className="space-y-4 text-brand-gray font-light">
                <li><Link to="/services" className="hover:text-white transition-colors">Elite Services</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">Our Heritage</Link></li>
                <li><a href="#location" className="hover:text-white transition-colors">Location Details</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-brand-main mb-6">Connect</h4>
              <div className="flex space-x-4 mb-8">
                <a href="#" className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center hover:bg-brand-main hover:border-brand-main transition-all duration-300">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center hover:bg-brand-main hover:border-brand-main transition-all duration-300">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
              <div className="space-y-3">
                <p className="text-brand-gray text-sm flex items-center">
                  <Phone className="h-4 w-4 mr-3 text-brand-main" />
                  {OWNER_INFO.phone}
                </p>
                <p className="text-brand-gray text-sm flex items-center">
                  <MapPin className="h-4 w-4 mr-3 text-brand-main" />
                  {OWNER_INFO.location}
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-brand-gray font-medium uppercase tracking-widest">
            <span>&copy; {new Date().getFullYear()} MIZGIN OIL. All Rights Reserved.</span>
            <span className="mt-4 md:mt-0 opacity-50 flex items-center">
              Crafted for Duhok Excellence
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};
