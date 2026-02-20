import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { FuelCalculator } from '../components/FuelCalculator';
import { Calculator as CalcIcon, Sparkles } from 'lucide-react';

const CalculatorPage: React.FC = () => {
  const { t, isRtl } = useLanguage();

  return (
    <div className={`bg-brand-light min-h-screen ${isRtl ? 'rtl' : 'ltr'}`}>
      {/* Page Header */}
      <section className="pt-48 pb-32 bg-brand-dark text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-black uppercase pointer-events-none select-none">
            PRECISION
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`max-w-3xl ${isRtl ? 'text-right mr-0 ml-auto' : 'text-left'}`}
          >
            <span className="text-white/40 font-black uppercase tracking-[0.5em] text-xs mb-8 block">{t('calc.subtitle')}</span>
            <h1 className="text-6xl md:text-8xl font-black mb-8 uppercase tracking-tighter leading-[0.85] text-white">
              {t('calc.title')} <br /><span className="text-white italic opacity-70">Instant Tool.</span>
            </h1>
            <p className="text-xl text-white/60 font-light max-w-2xl leading-relaxed">
              {t('calc.pageDesc')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calculator Main Section */}
      <section className="py-24 relative bg-brand-light">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Context/Info Column */}
            <motion.div 
              initial={{ opacity: 0, x: isRtl ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 space-y-12"
            >
              <div className={`glass p-10 rounded-[3rem] shadow-2xl transition-all group ${isRtl ? 'text-right' : 'text-left'}`}>
                <div className={`w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 text-white group-hover:bg-white/30 transition-all duration-500 ${isRtl ? 'mr-0 ml-auto' : ''}`}>
                  <Sparkles className="h-6 w-6" />
                </div>
                <h4 className="text-2xl font-black uppercase tracking-tighter text-white mb-4">{t('prices.perLiter')}</h4>
                <p className="text-white/80 font-light leading-relaxed">
                  {t('prices.subtitle')}
                </p>
              </div>

              <div className={`p-10 bg-brand-dark text-white rounded-[3rem] shadow-2xl relative overflow-hidden group ${isRtl ? 'text-right' : 'text-left'}`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl -mr-16 -mt-16 group-hover:bg-white/20 transition-colors" />
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white/50 mb-6">{t('prices.updated')}</h4>
                <p className="text-lg font-light opacity-80 leading-relaxed">
                  Our system synchronizes every hour with market refinements to ensure absolute pricing accuracy for every liter.
                </p>
              </div>
            </motion.div>

            {/* Calculator Column */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-7"
            >
              <div className="relative">
                <div className="absolute -inset-16 bg-brand-dark/20 blur-[120px] rounded-full pointer-events-none" />
                <FuelCalculator />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-32 bg-brand-dark text-white relative overflow-hidden mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
             <CalcIcon className="h-16 w-16 text-white mx-auto mb-10 opacity-30" />
            <h2 className="text-4xl md:text-6xl font-black mb-10 uppercase tracking-tighter leading-none">
              Need Expert <span className="text-white/70 italic">Assistance?</span>
            </h2>
            <p className="text-xl font-light mb-12 opacity-60 max-w-2xl mx-auto leading-relaxed">
              If you have specialized requirements for high-volume fueling or industrial kerosene needs, our concierge team is available to discuss custom quotes.
            </p>
            <a href="tel:+9647500000000" className="inline-block px-12 py-5 bg-white text-brand-dark font-black rounded-2xl hover:bg-brand-light hover:text-white transition-all duration-300 shadow-2xl uppercase tracking-widest text-sm">
              Contact Concierge
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CalculatorPage;