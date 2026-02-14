
import React from 'react';
import { motion } from 'framer-motion';
import { useAdmin } from '../contexts/AdminContext';
import { OWNER_INFO } from '../constants';
import { MessageCircle, Clock, Award, MapPin, CheckCircle2 } from 'lucide-react';

const AboutPage: React.FC = () => {
  const { contactPhone } = useAdmin();

  return (
    <div className="bg-brand-light">
      {/* Header */}
      <section className="pt-48 pb-32 bg-brand-gray relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000" 
            alt="MIZGIN OIL Legacy" 
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
            <span className="text-brand-main font-black uppercase tracking-[0.5em] text-xs mb-8 block">Our Legacy</span>
            <h1 className="text-6xl md:text-9xl font-black text-white mb-8 tracking-tighter uppercase leading-[0.8]">
              The <span className="text-brand-main italic">Source.</span>
            </h1>
            <div className="text-3xl md:text-5xl font-arabic text-brand-main mb-12 opacity-80" dir="rtl">
              {OWNER_INFO.localName}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-10 bg-brand-main/5 blur-[100px] rounded-full pointer-events-none" />
              <div className="relative z-10 space-y-10">
                <span className="text-brand-main font-black uppercase tracking-[0.4em] text-xs block">Leadership</span>
                <h2 className="text-6xl font-black text-brand-dark uppercase tracking-tighter leading-none">
                  Founded On <br /> <span className="text-brand-main">Trust.</span>
                </h2>
                <p className="text-2xl text-brand-gray font-light leading-relaxed">
                  "At MIZGIN OIL, we believe the road connects us all. Our mission is to ensure every journey is fueled by quality that never wavers."
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-px bg-brand-main" />
                  <span className="text-xl font-black text-brand-dark uppercase tracking-widest">{OWNER_INFO.name}</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-3xl">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800" 
                  alt="Mizgin - Founder" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-brand-main p-8 rounded-[3rem] shadow-3xl flex flex-col justify-center items-center text-white text-center">
                <Award className="h-10 w-10 mb-2" />
                <span className="text-[10px] uppercase font-black tracking-widest">Official Licensed Service</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-32 bg-brand-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { 
                icon: <MapPin className="h-8 w-8 text-brand-main" />, 
                title: "Location Details", 
                content: OWNER_INFO.address, 
                sub: OWNER_INFO.location 
              },
              { 
                icon: <MessageCircle className="h-8 w-8 text-brand-main" />, 
                title: "Concierge Contact", 
                content: contactPhone, 
                sub: "Tel / WhatsApp 24/7" 
              },
              { 
                icon: <Clock className="h-8 w-8 text-brand-main" />, 
                title: "Always Open", 
                content: "24 Hours Operations", 
                sub: "Fueling your journey day and night" 
              }
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-12 bg-white/5 rounded-[3rem] border border-white/10 hover:border-brand-main transition-colors duration-500"
              >
                <div className="mb-8">{card.icon}</div>
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-brand-main mb-6">{card.title}</h4>
                <p className="text-2xl font-black mb-2 uppercase tracking-tight">{card.content}</p>
                <p className="text-brand-gray text-sm font-light uppercase tracking-widest">{card.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment List */}
      <section className="py-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-black text-brand-dark mb-12 uppercase tracking-tighter leading-none">
              A Standard <br /> <span className="text-brand-main italic">Without Compromise.</span>
            </h2>
            <p className="text-xl text-brand-gray leading-relaxed font-light mb-16">
              {OWNER_INFO.description}
            </p>
            <div className="flex flex-wrap justify-center gap-12">
              {[
                "Certified Purity", "Elite Maintenance", "Community First", "Global Standards"
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-3 text-brand-dark font-black uppercase tracking-[0.2em] text-xs">
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
