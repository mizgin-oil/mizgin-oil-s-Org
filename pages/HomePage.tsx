
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';
import { useLanguage } from '../contexts/LanguageContext';
import { FuelCalculator } from '../components/FuelCalculator';
import { Zap, ShieldCheck, Star, Fuel, ArrowRight, ArrowUpRight, Droplets, ArrowLeft } from 'lucide-react';

const getFuelIcon = (type: string) => {
  const t = type.toLowerCase();
  if (t.includes('super')) return <Star className="h-12 w-12 text-brand-main transition-colors group-hover:text-white" />;
  if (t.includes('enhanced')) return <ShieldCheck className="h-12 w-12 text-brand-main transition-colors group-hover:text-white" />;
  if (t.includes('normal') || t.includes('kar')) return <Zap className="h-12 w-12 text-brand-main transition-colors group-hover:text-white" />;
  if (t.includes('diesel')) return <Droplets className="h-12 w-12 text-brand-main transition-colors group-hover:text-white" />;
  return <Fuel className="h-12 w-12 text-brand-main transition-colors group-hover:text-white" />;
};

const HomePage: React.FC = () => {
  const { fuelPrices } = useAdmin();
  const { t, isRtl } = useLanguage();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`overflow-x-hidden ${isRtl ? 'rtl' : 'ltr'}`}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden bg-brand-dark">
        <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1545147986-a9d6f210df77?auto=format&fit=crop&q=80&w=2000" 
            alt="MIZGIN OIL Station" 
            className="w-full h-full object-cover opacity-60 scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/20 via-brand-dark/60 to-brand-dark" />
        </motion.div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-10 leading-[0.85] uppercase text-white">
              {t('hero.title')} <br />
              <span className="text-brand-main italic drop-shadow-[0_0_40px_rgba(131,174,55,0.4)]">{t('hero.sub')}</span>
            </h1>
            <p className="text-xl md:text-3xl text-white/90 max-w-4xl mx-auto mb-16 font-medium leading-relaxed tracking-tight">
              {t('home.location.address')} — {t('home.location.dist')}
            </p>
            <div className={`flex flex-col sm:flex-row gap-8 justify-center items-center ${isRtl ? 'sm:flex-row-reverse' : ''}`}>
              <motion.button 
                onClick={() => scrollToSection('calculator')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-6 bg-brand-main text-white font-black rounded-3xl shadow-[0_25px_50px_-15px_rgba(131,174,55,0.6)] flex items-center justify-center space-x-4 uppercase tracking-[0.2em] text-[13px] cursor-pointer"
              >
                <span>{t('hero.rates')}</span>
                {isRtl ? <ArrowLeft className="h-5 w-5 mr-4" /> : <ArrowRight className="h-5 w-5 ml-4" />}
              </motion.button>
              <Link 
                to="/services" 
                className="px-12 py-6 glass-dark text-white font-black rounded-3xl border border-white/10 hover:bg-white/20 transition-all flex items-center justify-center uppercase tracking-[0.2em] text-[13px]"
              >
                {t('hero.ourServices')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Price Cards Section */}
      <section id="prices" className="py-40 relative bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex flex-col md:flex-row justify-between items-end mb-24 gap-10 ${isRtl ? 'md:flex-row-reverse' : ''}`}>
            <motion.div 
              initial={{ opacity: 0, x: isRtl ? 30 : -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              className={isRtl ? 'text-right' : 'text-left'}
            >
              <h2 className="text-6xl font-black text-brand-dark mb-6 tracking-tighter uppercase leading-none">
                {t('prices.title').split(' ')[0]} <span className="text-brand-main">{t('prices.title').split(' ')[1]}</span>
              </h2>
              <p className="text-brand-gray text-lg font-bold max-w-md uppercase tracking-[0.2em] opacity-50">
                {t('prices.subtitle')}
              </p>
            </motion.div>
            <div className="h-px bg-brand-gray/10 flex-grow mx-10 hidden md:block mb-5" />
            <span className="text-brand-main font-black text-xs uppercase tracking-[0.3em] bg-brand-main/5 px-8 py-3 rounded-full border border-brand-main/10 shadow-sm">
              {t('prices.updated')}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {fuelPrices.map((fuel, i) => {
              const fuelKey = fuel.type.toLowerCase().replace(/\s+/g, '_');
              const displayName = t(`fuel.${fuelKey}.name`) || fuel.type;
              const displayDesc = t(`fuel.${fuelKey}.desc`) || fuel.description;

              return (
                <motion.div 
                  key={fuel.type}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -15 }}
                  className="group relative p-12 bg-white rounded-[4rem] shadow-[0_50px_100px_-25px_rgba(0,0,0,0.06)] border border-white hover:border-brand-main transition-all duration-700 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-brand-main/5 rounded-full blur-3xl group-hover:bg-brand-main/15 transition-colors duration-700" />
                  
                  <div className={`relative z-10 ${isRtl ? 'text-right' : 'text-left'}`}>
                    <div className={`bg-brand-light w-24 h-24 rounded-[2rem] flex items-center justify-center mb-12 group-hover:scale-110 group-hover:bg-brand-main group-hover:text-white transition-all duration-700 ${isRtl ? 'mr-0 ml-auto' : ''}`}>
                      {getFuelIcon(fuel.type)}
                    </div>
                    <h3 className="text-4xl font-black text-brand-dark mb-5 tracking-tight uppercase">{displayName}</h3>
                    <div className={`flex items-baseline mb-8 ${isRtl ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <span className="text-6xl font-black text-brand-main tracking-tighter">{fuel.pricePerLiter}</span>
                      <span className={`${isRtl ? 'mr-4' : 'ml-4'} text-brand-gray font-black uppercase tracking-widest text-[11px] opacity-40 whitespace-nowrap`}>
                        {t('prices.perLiter')}
                      </span>
                    </div>
                    <p className="text-brand-gray text-lg leading-relaxed font-light">{displayDesc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Smart Tool Section */}
      <section id="calculator" className="py-40 bg-brand-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-32 items-center ${isRtl ? 'text-right' : 'text-left'}`}>
            <motion.div initial={{ opacity: 0, x: isRtl ? 50 : -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-brand-main font-black uppercase tracking-[0.5em] text-[10px] mb-10 block">{t('home.planningSub')}</span>
              <h2 className="text-6xl md:text-7xl font-black text-white mb-12 leading-none uppercase tracking-tighter">
                {t('home.planningTitle')} <br /><span className="text-brand-main italic">{t('home.planningItalic')}</span>
              </h2>
              
              <div className="space-y-14 mb-16">
                {[
                  { title: t('home.features.gasoline.title'), desc: t('home.features.gasoline.desc'), icon: <Fuel className="text-brand-main h-7 w-7" /> },
                  { title: t('home.features.kerosene.title'), desc: t('home.features.kerosene.desc'), icon: <Zap className="text-white h-7 w-7" /> },
                  { title: t('home.features.lpg.title'), desc: t('home.features.lpg.desc'), icon: <Star className="text-brand-main h-7 w-7" /> }
                ].map((item, idx) => (
                  <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className={`flex gap-8 group ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <div className="flex-shrink-0 w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-brand-main transition-all duration-500">{item.icon}</div>
                    <div>
                      <h4 className="font-black text-2xl text-white mb-3 uppercase tracking-wide leading-none">{item.title}</h4>
                      <p className="text-brand-gray leading-relaxed text-lg font-light max-w-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative">
              <div className="absolute -inset-16 bg-brand-main/20 blur-[120px] rounded-full pointer-events-none" />
              <FuelCalculator />
            </motion.div>
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
