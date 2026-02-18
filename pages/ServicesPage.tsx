
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';
import { useLanguage } from '../contexts/LanguageContext';
import { LayoutGrid, Sparkles, Star } from 'lucide-react';

const ServicesPage: React.FC = () => {
  const { customSections } = useAdmin();
  const { t, isRtl } = useLanguage();

  return (
    <div className={`bg-brand-light min-h-screen ${isRtl ? 'rtl' : 'ltr'}`}>
      {/* Page Header */}
      <section className="pt-48 pb-32 bg-brand-dark text-white relative overflow-hidden">
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
            <span className="text-brand-main font-black uppercase tracking-[0.5em] text-xs mb-8 block">{t('services.sub')}</span>
            <h1 className="text-6xl md:text-8xl font-black mb-8 uppercase tracking-tighter leading-[0.85] text-white">
              {t('services.title')} <br /><span className="text-brand-main italic">{t('services.italic')}</span>
            </h1>
            <p className="text-xl text-brand-gray font-light max-w-2xl leading-relaxed">
              {t('services.desc')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Dynamic Content Grid */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {customSections.length === 0 ? (
            <div className="text-center py-40 border-4 border-dashed border-brand-main/10 rounded-[4rem]">
              <Sparkles className="h-20 w-20 text-brand-main/20 mx-auto mb-8" />
              <h2 className="text-4xl font-black text-brand-dark uppercase tracking-tighter mb-4">{t('services.emptyTitle')}</h2>
              <p className="text-brand-gray text-xl font-light">{t('services.emptyDesc')}</p>
              <Link to="/admin" className="mt-10 inline-block text-brand-main font-black uppercase tracking-widest text-xs border-b-2 border-brand-main pb-1">{t('services.manage')}</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {customSections.map((section, idx) => (
                <motion.div 
                  key={section.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className={`bg-white p-12 rounded-[4rem] shadow-[0_50px_100px_-25px_rgba(0,0,0,0.06)] border border-white hover:border-brand-main transition-all duration-500 flex flex-col h-full group ${isRtl ? 'text-right' : 'text-left'}`}
                >
                  <div className={`w-20 h-20 bg-brand-light rounded-[2rem] flex items-center justify-center mb-10 text-brand-main group-hover:bg-brand-main group-hover:text-white transition-all duration-500 ${isRtl ? 'mr-0 ml-auto' : ''}`}>
                    <Star className="h-8 w-8" />
                  </div>
                  
                  <h4 className="text-4xl font-black uppercase tracking-tighter text-brand-dark mb-10 group-hover:text-brand-main transition-colors">{section.title}</h4>
                  
                  <div className="space-y-6 flex-grow">
                    {section.items.map(item => (
                      <div key={item.id} className={`flex justify-between items-end border-b border-brand-light pb-4 group/item ${isRtl ? 'flex-row-reverse' : ''}`}>
                        <div className={`flex flex-col ${isRtl ? 'text-right' : 'text-left'}`}>
                          <span className="font-black text-brand-gray uppercase text-sm tracking-tight group-hover/item:text-brand-dark transition-colors">{item.name}</span>
                          <span className="text-[9px] font-bold text-brand-main uppercase tracking-widest opacity-0 group-hover/item:opacity-100 transition-opacity">{t('services.premiumGrade')}</span>
                        </div>
                        <div className={isRtl ? 'text-left' : 'text-right'}>
                          <span className="font-black text-brand-main text-xl tracking-tighter">{item.price}</span>
                          <span className={`ml-2 text-[10px] font-black text-brand-gray/40 uppercase tracking-widest ${isRtl ? 'mr-2 ml-0' : 'ml-2'}`}>IQD</span>
                        </div>
                      </div>
                    ))}
                    {section.items.length === 0 && (
                      <p className="text-brand-gray/30 text-xs font-black uppercase tracking-widest italic py-4">{t('services.menuReview')}</p>
                    )}
                  </div>

                  <div className={`mt-12 pt-8 border-t border-brand-light`}>
                    <div className={`flex items-center space-x-3 text-brand-dark font-black uppercase tracking-[0.2em] text-[9px] ${isRtl ? 'space-x-reverse' : ''}`}>
                      <div className="w-1.5 h-1.5 bg-brand-main rounded-full" />
                      <span>{t('services.certified')}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-brand-main text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-20" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <h2 className="text-5xl md:text-7xl font-black mb-10 uppercase tracking-tighter leading-none">
              {t('services.ctaTitle')} <br /> {t('services.ctaItalic')}
            </h2>
            <p className="text-2xl font-light mb-12 opacity-80 max-w-2xl mx-auto">
              {t('services.ctaDesc')}
            </p>
            <Link to="/" className="inline-block px-12 py-5 bg-white text-brand-main font-black rounded-2xl hover:bg-brand-dark hover:text-white transition-all duration-300 shadow-2xl uppercase tracking-widest text-sm">
              {t('services.ctaBtn')}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
