import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';
import { FuelCalculator } from '../components/FuelCalculator';
import { Zap, ShieldCheck, Star, Fuel, ArrowRight, ArrowUpRight } from 'lucide-react';

const HomePage: React.FC = () => {
  const { fuelPrices } = useAdmin();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <div className="overflow-x-hidden">
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
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="mb-8 p-6 bg-brand-main/10 rounded-3xl border border-brand-main/20 backdrop-blur-sm inline-block"
            >
              <Fuel className="h-16 w-16 text-brand-main drop-shadow-[0_0_20px_rgba(131,174,55,0.6)]" />
            </motion.div>

            <div className="block">
              <span className="inline-block px-4 py-1.5 rounded-full bg-brand-main/20 text-brand-main text-xs font-bold uppercase tracking-[0.3em] mb-6 border border-brand-main/30 backdrop-blur-sm">
                Established Reliability
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] uppercase text-white">
              Mizgin <br />
              <span className="text-brand-main italic drop-shadow-[0_0_30px_rgba(131,174,55,0.3)]">Oil.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
              Experience the pinnacle of fuel quality and customer service at Duhok's most prestigious energy stop.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.a 
                href="#prices"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-brand-main text-white font-black rounded-2xl shadow-[0_20px_40px_-15px_rgba(131,174,55,0.5)] flex items-center justify-center space-x-3 uppercase tracking-widest text-sm"
              >
                <span>Live Rates</span>
                <ArrowRight className="h-4 w-4" />
              </motion.a>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to="/services" 
                  className="px-10 py-5 glass-dark text-white font-black rounded-2xl border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center uppercase tracking-widest text-sm"
                >
                  Our Services
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-30"
          >
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-2">
              <div className="w-1 h-2 bg-white rounded-full" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Price Cards Section */}
      <section id="prices" className="py-32 relative bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-black text-brand-dark mb-4 tracking-tighter uppercase leading-none">
                Fuel <span className="text-brand-main">Standards</span>
              </h2>
              <p className="text-brand-gray text-lg font-medium max-w-md uppercase tracking-widest opacity-60">
                Premium grade energy for the modern vehicle.
              </p>
            </motion.div>
            <div className="h-px bg-brand-gray/10 flex-grow mx-8 hidden md:block mb-4" />
            <span className="text-brand-main font-bold text-sm uppercase tracking-widest bg-brand-main/5 px-6 py-2 rounded-full border border-brand-main/10">
              Updated Hourly
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {fuelPrices.map((fuel, i) => {
              const Icon = fuel.type === 'Super' ? Star : (fuel.type === 'Enhanced' ? ShieldCheck : Zap);
              return (
                <motion.div 
                  key={fuel.type}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="group relative p-10 bg-white rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05)] border border-white hover:border-brand-main transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-brand-main/5 rounded-full blur-2xl group-hover:bg-brand-main/10 transition-colors" />
                  
                  <div className="relative z-10">
                    <div className="bg-brand-light w-20 h-20 rounded-[1.5rem] flex items-center justify-center mb-10 group-hover:scale-110 group-hover:bg-brand-main group-hover:text-white transition-all duration-500">
                      <Icon className="h-10 w-10 text-brand-main transition-colors group-hover:text-white" />
                    </div>
                    <h3 className="text-3xl font-extrabold text-brand-dark mb-4 tracking-tight uppercase">{fuel.type}</h3>
                    <div className="flex items-baseline mb-6">
                      <span className="text-5xl font-black text-brand-main tracking-tighter">{fuel.pricePerLiter}</span>
                      <span className="ml-3 text-brand-gray font-bold uppercase tracking-wider text-xs opacity-50">IQD / LITER</span>
                    </div>
                    <p className="text-brand-gray/80 leading-relaxed font-medium">
                      {fuel.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Smart Tool Section */}
      <section className="py-32 bg-brand-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-brand-main font-black uppercase tracking-[0.4em] text-xs mb-8 block">Efficiency & Insights</span>
              <h2 className="text-5xl md:text-6xl font-black text-white mb-10 leading-none uppercase tracking-tighter">
                Precision <br /><span className="text-brand-main">Planning.</span>
              </h2>
              
              <div className="space-y-12 mb-12">
                {[
                  { title: "Elite Gasoline", desc: "Three refined grades tailored for specialized engine performance.", icon: <Fuel className="text-brand-main h-6 w-6" /> },
                  { title: "Pure Kerosene", desc: "Ultra-high purity for critical industrial and domestic heating.", icon: <Zap className="text-white h-6 w-6" /> },
                  { title: "Refined LPG", desc: "Clean, consistent energy flow for sustainable applications.", icon: <Star className="text-brand-main h-6 w-6" /> }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-6 group"
                  >
                    <div className="flex-shrink-0 w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-brand-main group-hover:border-brand-main transition-all duration-500">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-xl text-white mb-2 uppercase tracking-wide">{item.title}</h4>
                      <p className="text-brand-gray leading-relaxed text-sm font-light">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-10 bg-brand-main/20 blur-[100px] rounded-full pointer-events-none" />
              <FuelCalculator />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map & Destination Section */}
      <section id="location" className="py-40 bg-brand-light overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[4rem] p-10 md:p-20 shadow-[0_80px_160px_-40px_rgba(0,0,0,0.1)] relative border border-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <span className="text-brand-main font-black uppercase tracking-[0.4em] text-xs mb-8 block">Destination</span>
                  <h2 className="text-6xl font-black text-brand-dark mb-8 tracking-tighter uppercase leading-none">
                    Join Us at <br /><span className="text-brand-main">The Hub.</span>
                  </h2>
                  <p className="text-brand-gray text-xl mb-12 font-light leading-relaxed">
                    Strategically located on the legendary Zakho Way, MIZGIN OIL is your 24/7 gateway to reliability.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-12">
                    <div className="space-y-2">
                      <h5 className="font-black text-xs uppercase tracking-widest text-brand-main">Location</h5>
                      <p className="text-brand-dark font-bold">Zakho Way, Duhok</p>
                      <p className="text-brand-gray text-sm">Near Tanahi District</p>
                    </div>
                    <div className="space-y-2">
                      <h5 className="font-black text-xs uppercase tracking-widest text-brand-main">Schedule</h5>
                      <p className="text-brand-dark font-bold">Always Open</p>
                      <p className="text-brand-gray text-sm">365 Days a Year</p>
                    </div>
                  </div>
                  
                  <motion.a 
                    href="https://waze.com/ul?ll=36.852598,42.911686&navigate=yes" 
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center space-x-4 px-10 py-5 bg-brand-dark text-white font-black rounded-[2rem] hover:bg-brand-main transition-colors shadow-2xl uppercase tracking-widest text-xs"
                  >
                    <span>Instant Navigation</span>
                    <ArrowUpRight className="h-5 w-5" />
                  </motion.a>
                </motion.div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative h-[600px] rounded-[3rem] overflow-hidden shadow-3xl border-8 border-brand-light group"
              >
                <iframe 
                  src="https://embed.waze.com/iframe?zoom=17&lat=36.852598&lon=42.911686&ct=livemap" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }}
                  allowFullScreen
                  className="grayscale hover:grayscale-0 transition-all duration-1000"
                ></iframe>
                <div className="absolute inset-0 pointer-events-none border-2 border-white/20 rounded-[3rem]" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
