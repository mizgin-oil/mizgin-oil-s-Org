
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAdmin } from '../contexts/AdminContext';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowLeft, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const ServiceCategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { customSections } = useAdmin();
  const { t, isRtl } = useLanguage();
  const navigate = useNavigate();

  const section = customSections.find(s => s.id === categoryId);

  if (!section) {
    return (
      <div className="min-h-screen bg-brand-light flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-3xl font-black uppercase mb-4">Category Not Found</h2>
          <Link to="/services" className="text-brand-dark font-bold underline">Back to Services</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-brand-light min-h-screen ${isRtl ? 'rtl' : 'ltr'}`}>
      {/* Page Header */}
      <section className="pt-32 pb-16 bg-brand-dark text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`max-w-3xl ${isRtl ? 'text-right mr-0 ml-auto' : 'text-left'}`}
          >
            <button 
              onClick={() => navigate('/services')}
              className={`flex items-center space-x-2 text-white/40 font-black uppercase tracking-[0.3em] text-[10px] mb-8 hover:text-white transition-colors ${isRtl ? 'space-x-reverse' : ''}`}
            >
              {isRtl ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              <span>{t('nav.services')}</span>
            </button>
            <h1 className="text-5xl md:text-7xl font-black mb-4 uppercase tracking-tighter leading-none text-white">
              {t(section.title)}
            </h1>
            <div className={`w-20 h-1 bg-brand-main mt-6 ${isRtl ? 'mr-0 ml-auto' : ''}`} />
          </motion.div>
        </div>
      </section>

      {/* Items List */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-[3rem] p-8 md:p-16 shadow-2xl"
          >
            <div className="space-y-8">
              {section.items.map((item, idx) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`flex justify-between items-center border-b border-white/10 pb-6 group ${isRtl ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`flex flex-col ${isRtl ? 'text-right' : 'text-left'}`}>
                    <span className="font-black text-white uppercase text-xl md:text-2xl tracking-tight">
                      {t(item.name)}
                    </span>
                    <div className={`flex items-center mt-2 space-x-2 ${isRtl ? 'space-x-reverse' : ''}`}>
                      <Star className="h-3 w-3 text-brand-main fill-brand-main" />
                      <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                        {t('services.premiumGrade')}
                      </span>
                    </div>
                  </div>
                  <div className={`flex flex-col items-end ${isRtl ? 'items-start' : 'items-end'}`}>
                    <div className={`flex items-baseline ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <span className="font-black text-white text-3xl md:text-4xl tracking-tighter">
                        {item.price.toLocaleString()}
                      </span>
                      <span className={`text-xs font-black text-white/40 uppercase tracking-widest ${isRtl ? 'mr-2' : 'ml-2'}`}>
                        IQD
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {section.items.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-white/30 text-lg font-black uppercase tracking-widest italic">
                    {t('services.menuReview')}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
          
          <div className="mt-16 text-center">
             <Link 
              to="/services" 
              className="inline-flex items-center space-x-3 px-10 py-4 bg-brand-dark text-white font-black rounded-2xl hover:bg-white hover:text-brand-dark transition-all shadow-xl uppercase tracking-widest text-xs"
            >
              {isRtl ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              <span>{t('nav.services')}</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceCategoryPage;
