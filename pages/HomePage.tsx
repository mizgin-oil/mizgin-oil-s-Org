
import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Fuel, ArrowUpRight, Zap, Star } from 'lucide-react';

const HomePage: React.FC = () => {
  const { fuelPrices, customSections } = useAdmin();
  const { t, isRtl } = useLanguage();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Filter out the "Elite" fuels for the special grid and use the others for the ticker
  const eliteFuelTypes = ['Elite Gasoline', 'Pure Kerosene', 'Refined LPG'];
  
  const tickerItemsRaw = fuelPrices.filter(f => !eliteFuelTypes.includes(f.type));
  const tickerItems = [...tickerItemsRaw, ...tickerItemsRaw, ...tickerItemsRaw, ...tickerItemsRaw, ...tickerItemsRaw];
  
  const getPrice = (type: string) => {
    return fuelPrices.find(f => f.type === type)?.pricePerLiter || 1000;
  };

  const eliteFuelItems = [
    { type: 'Elite Gasoline', title: t('home.features.gasoline.title'), price: `${getPrice('Elite Gasoline')} IQD/L`, icon: <Fuel className="h-5 w-5 md:h-6 md:w-6" /> },
    { type: 'Pure Kerosene', title: t('home.features.kerosene.title'), price: `${getPrice('Pure Kerosene')} IQD/L`, icon: <Zap className="h-5 w-5 md:h-6 md:w-6" /> },
    { type: 'Refined LPG', title: t('home.features.lpg.title'), price: `${getPrice('Refined LPG')} IQD/L`, icon: <Star className="h-5 w-5 md:h-6 md:w-6" /> }
  ];

  // Main Bottom Ticker Logic
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationId: number;
    const speed = 0.8;

    const scroll = () => {
      if (!isHovered) {
        if (isRtl) {
          container.scrollLeft -= speed;
          if (container.scrollLeft <= 0) {
            container.scrollLeft = container.scrollWidth / 3;
          }
        } else {
          container.scrollLeft += speed;
          if (container.scrollLeft >= container.scrollWidth / 3) {
            container.scrollLeft = 0;
          }
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [isHovered, isRtl]);

  return (
    <div className={`overflow-x-hidden bg-brand-light ${isRtl ? 'rtl' : 'ltr'}`}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-between text-white overflow-hidden bg-brand-light pt-20 md:pt-24 pb-12">
        <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1545147986-a9d6f210df77?auto=format&fit=crop&q=80&w=2000" 
            alt="MIZGIN OIL Station" 
            className="w-full h-full object-cover opacity-10 scale-105"
          />
          <div className="absolute inset-0 bg-brand-light/20" />
        </motion.div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
          <motion.div
            initial={{ opacity: 0, x: isRtl ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-4xl me-auto"
          >
            <div className="flex flex-col items-start text-start">
              <span className="text-xl md:text-2xl font-bold tracking-[0.2em] uppercase opacity-60 text-white mb-2">
                {t('hero.welcome')}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight uppercase text-white flex flex-wrap gap-x-4 mb-6">
                <span>{t('hero.title')}</span>
                <span className="text-brand-dark italic drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                  {t('hero.sub')}
                </span>
              </h1>

              {/* Service Buttons Grid */}
              <div className="flex flex-wrap gap-3 md:gap-4 mt-2 justify-start">
                {customSections.slice(0, 3).map((section) => (
                  <motion.div
                    key={section.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={`/services/${section.id}`}
                      className="w-24 h-24 md:w-32 md:h-32 glass shadow-xl rounded-[2.5rem] flex flex-col items-center justify-center p-3 text-center hover:bg-white/25 transition-all duration-300 group cursor-pointer"
                    >
                      <span className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.3em] text-white/50 mb-2 group-hover:text-white transition-colors">
                        Service
                      </span>
                      <span className="text-xs md:text-sm font-black uppercase tracking-tighter text-white leading-none">
                        {t(section.title)}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* FIXED ELITE FUEL SQUARES - NOW CLICKABLE */}
              <div className="mt-10 grid grid-cols-3 gap-3 md:gap-4 w-full max-w-sm md:max-w-xl me-auto">
                {eliteFuelItems.map((item, i) => (
                  <Link
                    key={i}
                    to={`/calculator?type=${encodeURIComponent(item.type)}`}
                    className="block"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + (i * 0.1) }}
                      className="w-24 h-24 md:w-32 md:h-32 glass shadow-2xl rounded-[2.5rem] flex flex-col items-center justify-center p-3 text-center border border-white/20 hover:bg-white/20 transition-all cursor-pointer group"
                    >
                      <div className="mb-2 p-1.5 md:p-2 bg-white/10 rounded-xl text-white group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      <span className="text-[11px] md:text-[13px] font-black uppercase tracking-widest text-white/50 mb-0.5 md:mb-1 leading-none">
                        {item.title}
                      </span>
                      <span className="text-[10px] md:text-sm font-black text-white whitespace-nowrap">
                        {item.price}
                      </span>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Dynamic Price Display Footer - Ticker Items are now clickable */}
        <div className="relative z-10 w-full mt-auto mb-4 md:mb-6">
          <div className="max-w-screen-2xl mx-auto px-4 md:px-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="glass border border-white/10 rounded-[2.5rem] p-1.5 md:p-2 overflow-hidden shadow-2xl relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-brand-light/40 to-transparent z-20 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-brand-light/40 to-transparent z-20 pointer-events-none" />

              <div 
                ref={scrollContainerRef}
                className="flex items-center overflow-x-auto no-scrollbar scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {tickerItems.map((fuel, i) => {
                  const fuelKey = fuel.type.toLowerCase().replace(/\s+/g, '_');
                  const displayName = t(`fuel.${fuelKey}.name`) || fuel.type;

                  return (
                    <Link 
                      key={`${fuel.type}-${i}`}
                      to={`/calculator?type=${encodeURIComponent(fuel.type)}`}
                      className="w-32 h-32 md:w-44 md:h-44 flex flex-col items-center justify-center border-r border-white/10 group hover:bg-white/5 transition-colors p-4 shrink-0 cursor-pointer"
                    >
                      <p className="text-xs md:text-sm font-black uppercase tracking-[0.2em] text-white/40 mb-2 group-hover:text-white transition-colors text-center leading-tight">
                        {displayName}
                      </p>
                      <div className="flex flex-col items-center">
                        <span className="text-xl md:text-4xl font-black tracking-tighter text-white">
                          {fuel.pricePerLiter}
                        </span>
                        <span className="text-[8px] md:text-[9px] font-bold text-white/20 uppercase tracking-widest mt-0.5">
                          IQD / L
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="py-16 md:py-24 bg-brand-light overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-[5rem] p-12 md:p-24 shadow-2xl relative border border-white/20 overflow-hidden">
            <div className={`absolute top-0 w-2 h-full bg-white ${isRtl ? 'right-0' : 'left-0'}`} />
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10 ${isRtl ? 'text-right' : 'text-left'}`}>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <span className="text-white font-black uppercase tracking-[0.5em] text-[10px] mb-10 block opacity-50">{t('home.location.sub')}</span>
                <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter uppercase leading-none">
                  {t('home.location.title')} <br /><span className="text-brand-dark italic">{t('home.location.italic')}</span>
                </h2>
                <p className="text-white/80 text-2xl mb-16 font-light leading-relaxed max-w-lg">
                  {t('home.location.desc')}
                </p>
                <div className={`grid grid-cols-1 sm:grid-cols-2 gap-12 mb-16 ${isRtl ? 'text-right' : 'text-left'}`}>
                  <div className="space-y-3">
                    <h5 className="font-black text-[10px] uppercase tracking-[0.4em] text-white/40">{t('home.location.label')}</h5>
                    <p className="text-white font-black text-xl uppercase tracking-tighter" dir="ltr">{t('home.location.address').split(',')[0]}</p>
                    <p className="text-white/60 text-base font-medium">{t('home.location.dist')}</p>
                  </div>
                  <div className="space-y-3">
                    <h5 className="font-black text-[10px] uppercase tracking-[0.4em] text-white/40">{t('home.location.schedule')}</h5>
                    <p className="text-white font-black text-xl uppercase tracking-tighter">{t('home.location.status')}</p>
                    <p className="text-white/60 text-base font-medium">{t('home.location.days')}</p>
                  </div>
                </div>
                <motion.a href="https://waze.com/ul?ll=36.852598,42.911686&navigate=yes" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={`inline-flex items-center space-x-5 px-12 py-6 bg-white text-brand-dark font-black rounded-[2.5rem] hover:bg-brand-dark hover:text-white transition-all shadow-2xl uppercase tracking-[0.2em] text-[13px] ${isRtl ? 'space-x-reverse' : ''}`}>
                  <span>{t('home.location.navBtn')}</span>
                  <ArrowUpRight className="h-6 w-6" />
                </motion.a>
              </motion.div>
              <div className="relative flex justify-center items-center">
                <div className="w-full max-w-[480px] aspect-square rounded-[3.5rem] overflow-hidden shadow-3xl border-8 border-white/20 relative">
                  <iframe 
                    src="https://embed.waze.com/iframe?zoom=17&lat=36.852598&lon=42.911686&ct=livemap" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    className="grayscale hover:grayscale-0 transition-all duration-1000 scale-105"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
