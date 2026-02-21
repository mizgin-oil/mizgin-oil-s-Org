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
      <section className="pt-24 pb-12 bg-brand-dark text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`max-w-3xl ${isRtl ? 'text-right mr-0 ml-auto' : 'text-left'}`}
          >
            <h1 className="text-5xl md:text-7xl font-black mb-4 uppercase tracking-tighter leading-[0.85] text-white">
              {t('calc.title')}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Calculator Main Section */}
      <section className="py-12 relative bg-brand-light">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-10 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <div className="relative">
              <div className="absolute -inset-16 bg-brand-dark/20 blur-[120px] rounded-full pointer-events-none" />
              <FuelCalculator />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-16 bg-brand-dark text-white relative overflow-hidden mt-6">
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