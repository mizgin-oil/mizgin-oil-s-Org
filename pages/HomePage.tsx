
import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';
import { useLanguage } from '../contexts/LanguageContext';
import { FuelCalculator } from '../components/FuelCalculator';
import { Fuel, ArrowUpRight, Zap, Star } from 'lucide-react';

const HomePage: React.FC = () => {
  const { fuelPrices, customSections } = useAdmin();
  const { t, isRtl } = useLanguage();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Triple the items to ensure smooth infinite loop for manual and auto scrolling
  const tickerItems = [...fuelPrices, ...fuelPrices, ...fuelPrices, ...fuelPrices, ...fuelPrices, ...fuelPrices];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationId: number;
    const speed = 0.8; // Pixels per frame

    const scroll = () => {
      if (!isHovered) {
        if (isRtl) {
          container.scrollLeft -= speed;
          // Loop back if we reach the start
          if (container.scrollLeft <= 0) {
            container.scrollLeft = container.scrollWidth / 3;
          }
        } else {
          container.scrollLeft += speed;
          // Loop back if we reach the end of the first set
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
    <div className={`overflow-x-hidden bg-brand-dark ${isRtl ? 'rtl' : 'ltr'}`}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-between text-white overflow-hidden bg-brand-dark pt-32 md:pt-40 pb-24">
        <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1545147986-a9d6f210df77?auto=format&fit=crop&q=80&w=2000" 
            alt="MIZGIN OIL Station" 
            className="w-full h-full object-cover opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/30 via-brand-dark/80 to-brand-dark" />
        </motion.div>
        
        {/* Welcome Text & Service Squares */}
        <div className={`relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full ${isRtl ? 'text-right' : 'text-left'}`}>
          <motion.div
            initial={{ opacity: 0, x: isRtl ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-4xl"
          >
            <div className={`flex flex-col ${isRtl ? 'items-end' : 'items-start'}`}>
              <span className="text-xl md:text-2xl font-bold tracking-[0.2em] uppercase opacity-60 text-white mb-2">
                {t('hero.welcome')}
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight uppercase text-white flex flex-wrap gap-x-4 mb-10">
                <span>{t('hero.title')}</span>
                <span className="text-brand-main italic drop-shadow-[0_0_30px_rgba(131,174,55,0.4)]">
                  {t('hero.sub')}
                </span>
              </h1>

              {/* Static Service Squares - Below Name, No Animation */}
              {customSections.length > 0 && (
                <div className={`flex flex-wrap gap-3 md:gap-4 mt-2 ${isRtl ? 'justify-end' : 'justify-start'}`}>
                  {customSections.map((section) => (
                    <Link
                      key={section.id}
                      to="/services"
                      className="w-24 h-24 md:w-32 md:h-32 glass-dark border border-white/10 rounded-[2rem] flex flex-col items-center justify-center p-3 text-center hover:bg-brand-main/10 transition-all duration-300 group shadow-lg"
                    >
                      <span className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.3em] text-brand-main mb-2 opacity-40 group-hover:opacity-100 transition-opacity">
                        Service
                      </span>
                      <span className="text-[10px] md:text-[12px] font-black uppercase tracking-tighter text-white/90 group-hover:text-white leading-none">
                        {section.title}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Manual + Auto Scroll Ticker - Smaller Perfect Square Boxes */}
        <div className="relative z-10 w-full mt-auto mb-12">
          <div className="max-w-screen-2xl mx-auto px-4 md:px-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="glass-dark border border-white/5 rounded-[2.5rem] p-1.5 md:p-2 overflow-hidden shadow-[0_40px_100px_-15px_rgba(0,0,0,0.6)] relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onTouchStart={() => setIsHovered(true)}
              onTouchEnd={() => setIsHovered(false)}
            >
              {/* Fade masks for elegant transition */}
              <div className="absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-brand-dark/90 to-transparent z-20 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-brand-dark/90 to-transparent z-20 pointer-events-none" />

              <div 
                ref={scrollContainerRef}
                className="flex items-center overflow-x-auto no-scrollbar scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {tickerItems.map((fuel, i) => {
                  const fuelKey = fuel.type.toLowerCase().replace(/\s+/g, '_');
                  const displayName = t(`fuel.${fuelKey}.name`) || fuel.type;

                  return (
                    <div 
                      key={`${fuel.type}-${i}`}
                      className="w-32 h-32 md:w-44 md:h-44 flex flex-col items-center justify-center border-r border-white/5 group hover:bg-white/[0.03] transition-colors p-4 shrink-0"
                    >
                      <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2 group-hover:text-brand-main transition-colors text-center leading-tight">
                        {displayName}
                      </p>
                      <div className="flex flex-col items-center">
                        <span className="text-xl md:text-4xl font-black tracking-tighter text-white">
                          {fuel.pricePerLiter}
                        </span>
                        <span className="text-[8px] md:text-[9px] font-bold text-white/10 uppercase tracking-widest mt-0.5">
                          IQD / L
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-40 bg-brand-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-32 items-center ${isRtl ? 'text-right' : 'text-left'}`}>
            <motion.div initial={{ opacity: 0, x: isRtl ? 50 : -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-brand-main font-black uppercase tracking-[0.5em] text-[10px] mb-10 block">{t('calc.subtitle')}</span>
              <h2 className="text-6xl md:text-7xl font-black text-white mb-12 leading-none uppercase tracking-tighter">
                {t('calc.title')} <br /><span className="text-brand-main italic">Instant Tool.</span>
              </h2>
              
              <div className="space-y-10 mb-16">
                 <p className="text-xl text-brand-gray/60 font-light leading-relaxed max-w-md">
                   Our smart precision tool allows you to calculate volume and cost based on our real-time refined market rates.
                 </p>
                 <div className="flex flex-wrap gap-4">
                    {fuelPrices.map(f => (
                      <div key={f.type} className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-brand-gray/50 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-brand-main rounded-full" />
                        {f.type}: {f.pricePerLiter} IQD
                      </div>
                    ))}
                 </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative">
              <div className="absolute -inset-16 bg-brand-main/10 blur-[120px] rounded-full pointer-events-none" />
              <FuelCalculator />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Stripe Section */}
      <section id="planning" className="py-40 bg-brand-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`flex flex-col md:flex-row justify-between items-end mb-24 gap-8 ${isRtl ? 'md:flex-row-reverse' : ''}`}>
            <motion.div initial={{ opacity: 0, x: isRtl ? 30 : -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
                {t('home.planningTitle')} <span className="text-brand-main italic">{t('home.planningItalic')}</span>
              </h2>
            </motion.div>
            <span className="text-brand-main font-black uppercase tracking-[0.4em] text-[10px] border border-brand-main/30 px-8 py-3 rounded-full">
              {t('home.planningSub')}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: t('home.features.gasoline.title'), desc: t('home.features.gasoline.desc'), icon: <Fuel className="text-brand-main h-8 w-8" /> },
              { title: t('home.features.kerosene.title'), desc: t('home.features.kerosene.desc'), icon: <Zap className="text-white h-8 w-8" /> },
              { title: t('home.features.lpg.title'), desc: t('home.features.lpg.desc'), icon: <Star className="text-brand-main h-8 w-8" /> }
            ].map((item, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ delay: idx * 0.1 }}
                className={`bg-white/5 p-12 rounded-[3rem] border border-white/10 hover:border-brand-main transition-all group ${isRtl ? 'text-right' : 'text-left'}`}
              >
                <div className={`w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-10 group-hover:bg-brand-main transition-all ${isRtl ? 'mr-0 ml-auto' : ''}`}>{item.icon}</div>
                <h4 className="font-black text-2xl text-white mb-4 uppercase tracking-tight">{item.title}</h4>
                <p className="text-brand-gray/60 leading-relaxed text-lg font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section id="location" className="py-48 bg-brand-light overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[5rem] p-12 md:p-24 shadow-[0_100px_200px_-50px_rgba(0,0,0,0.12)] relative border border-white overflow-hidden">
            <div className={`absolute top-0 w-2 h-full bg-brand-main ${isRtl ? 'right-0' : 'left-0'}`} />
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10 ${isRtl ? 'text-right' : 'text-left'}`}>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <span className="text-brand-main font-black uppercase tracking-[0.5em] text-[10px] mb-10 block">{t('home.location.sub')}</span>
                <h2 className="text-7xl font-black text-brand-dark mb-10 tracking-tighter uppercase leading-none">
                  {t('home.location.title')} <br /><span className="text-brand-main italic">{t('home.location.italic')}</span>
                </h2>
                <p className="text-brand-gray text-2xl mb-16 font-light leading-relaxed max-w-lg">
                  {t('home.location.desc')}
                </p>
                <div className={`grid grid-cols-1 sm:grid-cols-2 gap-12 mb-16 ${isRtl ? 'text-right' : 'text-left'}`}>
                  <div className="space-y-3">
                    <h5 className="font-black text-[10px] uppercase tracking-[0.4em] text-brand-main">{t('home.location.label')}</h5>
                    <p className="text-brand-dark font-black text-xl uppercase tracking-tighter" dir="ltr">{t('home.location.address').split(',')[0]}</p>
                    <p className="text-brand-gray text-base font-medium">{t('home.location.dist')}</p>
                  </div>
                  <div className="space-y-3">
                    <h5 className="font-black text-[10px] uppercase tracking-[0.4em] text-brand-main">{t('home.location.schedule')}</h5>
                    <p className="text-brand-dark font-black text-xl uppercase tracking-tighter">{t('home.location.status')}</p>
                    <p className="text-brand-gray text-base font-medium">{t('home.location.days')}</p>
                  </div>
                </div>
                <motion.a href="https://waze.com/ul?ll=36.852598,42.911686&navigate=yes" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={`inline-flex items-center space-x-5 px-12 py-6 bg-brand-dark text-white font-black rounded-[2.5rem] hover:bg-brand-main transition-all shadow-2xl uppercase tracking-[0.2em] text-[13px] ${isRtl ? 'space-x-reverse' : ''}`}>
                  <span>{t('home.location.navBtn')}</span>
                  <ArrowUpRight className="h-6 w-6" />
                </motion.a>
              </motion.div>
              <div className="relative h-[650px] rounded-[4rem] overflow-hidden shadow-3xl border-8 border-brand-light">
                <iframe src="https://embed.waze.com/iframe?zoom=17&lat=36.852598&lon=42.911686&ct=livemap" width="100%" height="100%" style={{ border: 0 }} allowFullScreen className="grayscale hover:grayscale-0 transition-all duration-1000 scale-105"></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
