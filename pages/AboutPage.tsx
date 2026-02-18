
import React from 'react';
import { motion } from 'framer-motion';
import { useAdmin } from '../contexts/AdminContext';
import { useLanguage } from '../contexts/LanguageContext';
import { OWNER_INFO, LEGACY_BRAND_IMAGE } from '../constants';
import { MessageCircle, Clock, Award, MapPin, CheckCircle2, History } from 'lucide-react';

const AboutPage: React.FC = () => {
  const { contactPhone } = useAdmin();
  const { t, isRtl } = useLanguage();

  const legacyPoints = [
    { 
      icon: <MapPin className="h-8 w-8 text-brand-main" />, 
      title: t('about.primeLocation'), 
      content: t('home.location.address'), 
      sub: t('about.heartOfZakho') 
    },
    { 
      icon: <MessageCircle className="h-8 w-8 text-brand-main" />, 
      title: t('about.clientSupport'), 
      content: contactPhone, 
      sub: t('about.concierge247') 
    },
    { 
      icon: <Clock className="h-8 w-8 text-brand-main" />, 
      title: t('about.roundTheClock'), 
      content: t('about.uninterrupted'), 
      sub: t('about.fuelingJourney') 
    }
  ];

  return (
    <div className={`bg-brand-light ${isRtl ? 'rtl' : 'ltr'}`}>
      {/* Header */}
      <section className="pt-48 pb-32 bg-brand-gray relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000" 
            alt="MIZGIN OIL Legacy Background" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-gray via-brand-gray/80 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <span className="text-brand-main font-black uppercase tracking-[0.5em] text-xs mb-8 block">{t('footer.excellence')}</span>
            <h1 className="text-6xl md:text-9xl font-black text-white mb-8 tracking-tighter uppercase leading-[0.8]">
              {t('about.heritage').split('.')[0]}<span className="text-brand-main italic">.</span>
            </h1>
            <div className="text-3xl md:text-5xl font-arabic text-brand-main mb-12 opacity-80" dir="rtl">
              {OWNER_INFO.localName}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Heritage & Brand Image Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-24 items-center ${isRtl ? 'lg:flex-row-reverse' : ''}`}>
            <motion.div
              initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`relative order-2 lg:order-1 ${isRtl ? 'text-right' : 'text-left'}`}
            >
              <div className="absolute -inset-10 bg-brand-main/5 blur-[100px] rounded-full pointer-events-none" />
              <div className="relative z-10 space-y-10">
                <div className={`flex items-center space-x-4 ${isRtl ? 'space-x-reverse justify-end' : ''}`}>
                  <div className="w-12 h-12 bg-brand-main/10 rounded-xl flex items-center justify-center">
                    <History className="h-6 w-6 text-brand-main" />
                  </div>
                  <span className="text-brand-main font-black uppercase tracking-[0.4em] text-xs block">{t('about.established')}</span>
                </div>
                <h2 className="text-6xl font-black text-brand-dark uppercase tracking-tighter leading-none">
                  {t('about.symbol').split(' ').slice(0, -1).join(' ')} <br /> <span className="text-brand-main">{t('about.symbol').split(' ').slice(-1)}</span>
                </h2>
                <p className="text-2xl text-brand-gray font-light leading-relaxed">
                  "{t('about.desc')}"
                </p>
                <div className={`flex items-center space-x-4 pt-6 ${isRtl ? 'space-x-reverse justify-end' : ''}`}>
                  <div className="w-16 h-px bg-brand-main" />
                  <span className="text-xl font-black text-brand-dark uppercase tracking-widest">{OWNER_INFO.name}</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative group order-1 lg:order-2"
            >
              <div className="absolute -inset-4 bg-brand-main rounded-[4.5rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
              <div className="aspect-square rounded-[4rem] overflow-hidden shadow-3xl bg-brand-gray border-[12px] border-white p-12 relative flex items-center justify-center">
                <img 
                  src={LEGACY_BRAND_IMAGE} 
                  alt="Mizgin Oil Official Brand Mark" 
                  className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-110"
                />
              </div>
              <div className={`absolute -bottom-10 w-48 h-48 bg-brand-dark p-8 rounded-[3rem] shadow-3xl flex flex-col justify-center items-center text-white text-center border-4 border-white ${isRtl ? '-right-10' : '-left-10'}`}>
                <Award className="h-10 w-10 mb-2 text-brand-main" />
                <span className="text-[10px] uppercase font-black tracking-widest text-white/80">{t('about.premiumBrand')}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Operational Prowess */}
      <section className="py-32 bg-brand-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {legacyPoints.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`p-12 bg-white/5 rounded-[3rem] border border-white/10 hover:border-brand-main transition-all duration-500 group ${isRtl ? 'text-right' : 'text-left'}`}
              >
                <div className={`mb-8 group-hover:scale-110 transition-transform ${isRtl ? 'flex justify-end' : ''}`}>{card.icon}</div>
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-brand-main mb-6">{card.title}</h4>
                <p className="text-2xl font-black mb-2 uppercase tracking-tight leading-tight" dir="ltr">{card.content}</p>
                <p className="text-brand-gray text-sm font-light uppercase tracking-widest">{card.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Commitment */}
      <section className="py-40 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-black text-brand-dark mb-12 uppercase tracking-tighter leading-none">
              {t('about.standard')} <br /> <span className="text-brand-main italic">{t('about.definedByHonor')}</span>
            </h2>
            <p className="text-xl text-brand-gray leading-relaxed font-light mb-16">
              {t('about.fullDesc')}
            </p>
            <div className={`flex flex-wrap justify-center gap-12 ${isRtl ? 'flex-row-reverse' : ''}`}>
              {[
                t('about.purity'), t('about.maintenance'), t('about.community'), t('about.global')
              ].map((item, i) => (
                <div key={i} className={`flex items-center space-x-3 text-brand-dark font-black uppercase tracking-[0.2em] text-[10px] ${isRtl ? 'space-x-reverse' : ''}`}>
                  <CheckCircle2 className="h-5 w-5 text-brand-main" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
