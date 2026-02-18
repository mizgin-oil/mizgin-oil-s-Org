
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MapPin, Phone, Instagram, Facebook, Lock, Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { OWNER_INFO, BRAND_LOGO_URL } from '../constants';
import { useAdmin } from '../contexts/AdminContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Language } from '../types';

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    stroke="none"
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.47V15.5c0 1.93-.43 3.91-1.74 5.33-1.32 1.45-3.37 2.18-5.32 2.12-1.95-.06-3.87-.87-5.04-2.43-1.18-1.57-1.55-3.69-1.07-5.59.49-1.91 1.97-3.57 3.84-4.18 1.1-.36 2.29-.38 3.42-.12v4.09c-.83-.24-1.74-.2-2.52.24-.78.44-1.35 1.25-1.47 2.13-.12.89.15 1.83.74 2.49.59.66 1.48.97 2.36.91.87-.06 1.7-.5 2.15-1.25.46-.75.61-1.65.59-2.52-.01-3.33-.01-6.66-.01-9.99.01-.13 0-.27.01-.4z" />
  </svg>
);

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const location = useLocation();
  const { contactPhone } = useAdmin();
  const { language, setLanguage, t, isRtl } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: t('nav.experience') },
    { path: '/services', label: t('nav.services') },
    { path: '/about', label: t('nav.legacy') },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'ku-ba', label: 'Badînî' },
    { code: 'ku-so', label: 'Soranî' },
    { code: 'ar', label: 'عربي' },
    { code: 'tr', label: 'Türkçe' },
  ];

  const socialLinks = {
    tiktok: 'https://www.tiktok.com/@mizgin.oil',
    facebook: 'https://www.facebook.com/share/187RnoDMRe/',
    instagram: 'https://www.instagram.com/mizgin.oil.station'
  };

  const isDarkBgPage = location.pathname === '/' || location.pathname === '/services' || location.pathname === '/about';
  const useDarkText = scrolled || (!isDarkBgPage);

  return (
    <div className={`min-h-screen flex flex-col font-sans selection:bg-brand-main selection:text-white ${isRtl ? 'rtl' : 'ltr'}`}>
      {/* Header */}
      <header className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className={`transition-all duration-500 rounded-full px-4 sm:px-8 flex justify-between items-center h-16 sm:h-20 ${scrolled ? 'glass shadow-2xl border border-white/20' : 'bg-transparent'}`}>
            <Link to="/" className="flex items-center group">
              <div className={`flex items-center ${isRtl ? 'space-x-reverse space-x-2 sm:space-x-3' : 'space-x-2 sm:space-x-3'}`}>
                <img 
                  src={BRAND_LOGO_URL} 
                  alt="MIZGIN OIL" 
                  className={`h-10 sm:h-12 w-auto transition-all duration-500 object-contain ${useDarkText ? 'brightness-100 invert-0' : 'brightness-0 invert'} ${scrolled ? 'scale-90' : 'scale-100'}`}
                />
                <div className="flex flex-col -space-y-1">
                  <span className={`text-lg sm:text-xl font-black tracking-tighter transition-colors duration-500 ${useDarkText ? 'text-brand-dark' : 'text-white'}`}>
                    MIZGIN<span className="text-brand-main">OIL</span>
                  </span>
                  <span className={`text-[7px] sm:text-[8px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] transition-colors duration-500 ${useDarkText ? 'text-brand-dark opacity-40' : 'text-white opacity-60'}`}>
                    Duhok
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className={`hidden md:flex items-center ${isRtl ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 relative group overflow-hidden ${
                    location.pathname === link.path 
                      ? (useDarkText ? 'text-brand-main' : 'text-white')
                      : (useDarkText ? 'text-brand-gray hover:text-brand-dark' : 'text-white/70 hover:text-white')
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  {location.pathname === link.path && (
                    <motion.div 
                      layoutId="activeTab"
                      className={`absolute inset-0 rounded-full -z-0 ${useDarkText ? 'bg-brand-main/10' : 'bg-white/10'}`}
                    />
                  )}
                </Link>
              ))}

              {/* Language Switcher */}
              <div className="relative mx-2">
                <button 
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${isRtl ? 'space-x-reverse' : ''} ${useDarkText ? 'text-brand-gray hover:text-brand-dark' : 'text-white/70 hover:text-white'}`}
                >
                  <Globe className="h-4 w-4" />
                  <span className="uppercase">{language.split('-')[0]}</span>
                  <ChevronDown className={`h-3 w-3 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isLangOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full mt-2 right-0 glass-dark shadow-2xl rounded-2xl p-2 min-w-[140px] border border-white/10"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code);
                            setIsLangOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 rounded-xl text-xs font-bold transition-colors ${isRtl ? 'text-right' : 'text-left'} ${language === lang.code ? 'bg-brand-main text-white' : 'text-white/70 hover:bg-white/10'}`}
                        >
                          {lang.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a 
                href="#location"
                className="ml-6 px-7 py-3 bg-brand-main text-white text-[11px] font-black rounded-full hover:shadow-[0_0_25px_rgba(131,174,55,0.4)] transition-all uppercase tracking-widest"
              >
                {t('nav.visitHub')}
              </a>
            </div>

            {/* Mobile Button */}
            <div className="flex md:hidden items-center space-x-2">
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className={`p-2 rounded-full ${useDarkText ? 'text-brand-dark' : 'text-white'}`}
              >
                <Globe className="h-5 w-5" />
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-full transition-colors ${useDarkText ? 'text-brand-dark hover:bg-brand-gray/10' : 'text-white hover:bg-white/10'}`}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-24 inset-x-4 glass shadow-3xl rounded-3xl p-6 border border-white/20 overflow-hidden"
            >
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-4 py-4 rounded-2xl text-lg font-black transition-all ${location.pathname === link.path ? 'bg-brand-main text-white' : 'text-brand-gray hover:bg-brand-main/10'}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Lang Selector */}
        <AnimatePresence>
          {isLangOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="md:hidden absolute top-24 right-4 glass-dark shadow-3xl rounded-3xl p-4 border border-white/10 min-w-[160px]"
            >
               <div className="flex flex-col space-y-1">
                 {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLangOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-black transition-colors ${isRtl ? 'text-right' : 'text-left'} ${language === lang.code ? 'bg-brand-main text-white' : 'text-white/70'}`}
                    >
                      {lang.label}
                    </button>
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
              <Link to="/" className={`inline-flex items-center space-x-6 mb-10 group ${isRtl ? 'space-x-reverse' : ''}`}>
                <img src={BRAND_LOGO_URL} alt="MIZGIN OIL" className="h-20 w-auto object-contain brightness-0 invert" />
                <div className="flex flex-col">
                  <span className="text-3xl font-black tracking-tighter uppercase block">MIZGIN<span className="text-brand-main">OIL</span></span>
                  <span className="text-[10px] font-bold text-brand-main uppercase tracking-[0.5em]">{t('footer.eliteChoice')}</span>
                </div>
              </Link>
              <p className="text-brand-gray text-xl max-w-md font-light leading-relaxed">{t('footer.tagline')}</p>
            </div>
            
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-main mb-8">{t('footer.concierge')}</h4>
              <ul className="space-y-5 text-brand-gray font-medium">
                <li><Link to="/services" className="hover:text-white transition-colors">{t('nav.services')}</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">{t('nav.legacy')}</Link></li>
                <li><a href="#location" className="hover:text-white transition-colors">{t('nav.visitHub')}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-main mb-8">{t('footer.connect')}</h4>
              <div className={`flex space-x-4 mb-10 ${isRtl ? 'space-x-reverse' : ''}`}>
                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center hover:bg-brand-main hover:border-brand-main transition-all duration-500"><Facebook className="h-5 w-5" /></a>
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center hover:bg-brand-main hover:border-brand-main transition-all duration-500"><Instagram className="h-5 w-5" /></a>
                <a href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center hover:bg-brand-main hover:border-brand-main transition-all duration-500"><TikTokIcon className="h-5 w-5" /></a>
              </div>
              <div className="space-y-4">
                <p className="text-brand-gray text-sm font-bold flex items-center">
                  <Phone className={`h-4 w-4 text-brand-main ${isRtl ? 'ml-4' : 'mr-4'}`} />
                  <span dir="ltr">{contactPhone}</span>
                </p>
                <p className="text-brand-gray text-sm font-bold flex items-center">
                  <MapPin className={`h-4 w-4 text-brand-main ${isRtl ? 'ml-4' : 'mr-4'}`} />
                  {OWNER_INFO.location}
                </p>
              </div>
            </div>
          </div>
          
          <div className={`mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] text-brand-gray font-black uppercase tracking-[0.4em]`}>
            <span>&copy; {new Date().getFullYear()} MIZGIN OIL. {t('footer.rights')}</span>
            
            <div className={`mt-6 md:mt-0 flex items-center ${isRtl ? 'space-x-reverse space-x-10' : 'space-x-10'}`}>
              <Link to="/admin" className={`flex items-center space-x-3 text-brand-main/60 hover:text-brand-main transition-all group ${isRtl ? 'space-x-reverse' : ''}`}>
                <Lock className="h-3 w-3 transition-transform group-hover:scale-110" />
                <span>{t('nav.admin')}</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
