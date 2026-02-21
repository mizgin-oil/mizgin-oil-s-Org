
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Sparkles, Star } from 'lucide-react';

const ServicesPage: React.FC = () => {
  const { customSections } = useAdmin();
  const { t, isRtl } = useLanguage();

  return (
    <div className={`bg-brand-light min-h-screen ${isRtl ? 'rtl' : 'ltr'}`}>
      {/* Page Header */}
      <section className="pt-24 pb-12 bg-brand-dark text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-black uppercase pointer-events-none select-none">
            ELITE
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`max-w-3xl ${isRtl ? 'text-right mr-0 ml-auto' : 'text-left'}`}
          >
            <span className="text-white/40 font-black uppercase tracking-[0.5em] text-xs mb-8 block">{t('services.sub')}</span>
            <h1 className="text-5xl md:text-7xl font-black mb-8 uppercase tracking-tighter leading-[0.85] text-white">
              {t('services.title')} <br /><span className="text-white italic opacity-70">{t('services.italic')}</span>
            </h1>
            <p className="text-xl text-white/60 font-light max-w-2xl leading-relaxed">
              {t('services.desc')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Dynamic Content Grid */}
      <section className="py-12 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {customSections.length === 0 ? (
            <div className="text-center py-40 glass rounded-[4rem]">
              <Sparkles className="h-20 w-20 text-white/20 mx-auto mb-8" />
              <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-4">{t('services.emptyTitle')}</h2>
              <p className="text-white/60 text-xl font-light">{t('services.emptyDesc')}</p>
              <Link to="/admin" className="mt-10 inline-block text-white font-black uppercase tracking-widest text-xs border-b-2 border-white pb-1">{t('services.manage')}</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {customSections.map((section, idx) => (
                <Link key={section.id} to={`/services/${section.id}`}>
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10 }}
                    className={`glass p-12 rounded-[4rem] shadow-2xl hover:bg-white/20 transition-all duration-500 flex flex-col h-full group cursor-pointer ${isRtl ? 'text-right' : 'text-left'}`}
                  >
                    <div className={`w-20 h-20 bg-white/10 rounded-[2rem] flex items-center justify-center mb-10 text-white group-hover:bg-white group-hover:text-brand-light transition-all duration-500 ${isRtl ? 'mr-0 ml-auto' : ''}`}>
                      <Star className="h-8 w-8" />
                    </div>
                    
                    <h4 className="text-4xl font-black uppercase tracking-tighter text-white mb-6 transition-colors">
                      {t(section.title)}
                    </h4>
                    
                    <p className="text-white/60 text-lg font-light mb-10 flex-grow">
                      {section.items.length} {isRtl ? 'بڕگە' : 'Items'} {isRtl ? 'بەردەستن' : 'Available'}
                    </p>

                    <div className={`flex items-center space-x-3 text-white font-black uppercase tracking-[0.2em] text-[10px] ${isRtl ? 'space-x-reverse' : ''}`}>
                      <span>{isRtl ? 'بینینی لیستە' : 'View Menu'}</span>
                      <Star className="h-3 w-3 fill-white" />
                    </div>

                    <div className={`mt-10 pt-8 border-t border-white/10`}>
                      <div className={`flex items-center space-x-3 text-white font-black uppercase tracking-[0.2em] text-[9px] ${isRtl ? 'space-x-reverse' : ''}`}>
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                        <span>{t('services.certified')}</span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-brand-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-brand-light opacity-50" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <h2 className="text-5xl md:text-7xl font-black mb-10 uppercase tracking-tighter leading-none">
              {t('services.ctaTitle')} <br /> <span className="text-white/70 italic">{t('services.ctaItalic')}</span>
            </h2>
            <p className="text-2xl font-light mb-12 opacity-60 max-w-2xl mx-auto">
              {t('services.ctaDesc')}
            </p>
            <Link to="/" className="inline-block px-12 py-5 bg-white text-brand-dark font-black rounded-2xl hover:bg-brand-light hover:text-white transition-all duration-300 shadow-2xl uppercase tracking-widest text-sm">
              {t('services.ctaBtn')}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
