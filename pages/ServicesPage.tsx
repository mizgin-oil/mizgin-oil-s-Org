
import React from 'react';
import { motion } from 'framer-motion';
// Added missing Link import
import { Link } from 'react-router-dom';
import { SERVICES } from '../constants';
import { Coffee, Droplets, ShoppingBag, Settings as Tool, ArrowRight } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  'Droplets': <Droplets className="h-10 w-10" />,
  'Coffee': <Coffee className="h-10 w-10" />,
  'ShoppingBag': <ShoppingBag className="h-10 w-10" />,
  'Tool': <Tool className="h-10 w-10" />
};

const ServicesPage: React.FC = () => {
  return (
    <div className="bg-brand-light min-h-screen">
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
            className="max-w-3xl"
          >
            <span className="text-brand-main font-black uppercase tracking-[0.5em] text-xs mb-8 block">Concierge & Care</span>
            <h1 className="text-6xl md:text-8xl font-black mb-8 uppercase tracking-tighter leading-[0.85]">
              Elite <br /><span className="text-brand-main italic">Amenities.</span>
            </h1>
            <p className="text-xl text-brand-gray font-light max-w-2xl leading-relaxed">
              We redefine the standard stop. Discover a curated suite of services designed for your vehicle's health and your personal comfort.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-24">
            {SERVICES.map((service, index) => (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`flex flex-col lg:flex-row items-center gap-16 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className="lg:w-1/2 group">
                  <div className="relative rounded-[3rem] overflow-hidden shadow-3xl">
                    <motion.img 
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 1 }}
                      src={service.image} 
                      alt={service.name} 
                      className="w-full aspect-[4/3] object-cover"
                    />
                    <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-brand-dark/0 transition-all duration-700" />
                  </div>
                </div>
                
                <div className="lg:w-1/2 space-y-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-main/10 rounded-3xl text-brand-main border border-brand-main/20">
                    {iconMap[service.icon]}
                  </div>
                  <h3 className="text-5xl font-black text-brand-dark uppercase tracking-tighter">{service.name}</h3>
                  <p className="text-xl text-brand-gray leading-relaxed font-light">
                    {service.description}
                  </p>
                  <ul className="space-y-4">
                    {['Premium Quality Guaranteed', 'Professional Service Team', 'Available 24/7'].map((feat, i) => (
                      <li key={i} className="flex items-center space-x-3 text-brand-dark font-bold text-sm uppercase tracking-widest">
                        <div className="w-1.5 h-1.5 bg-brand-main rounded-full" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="group flex items-center space-x-4 px-8 py-4 bg-brand-dark text-white rounded-2xl hover:bg-brand-main transition-all duration-300 uppercase tracking-widest text-xs font-black shadow-xl">
                    <span>Explore Details</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-brand-main text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-20" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-black mb-10 uppercase tracking-tighter leading-none">
              Quality That <br /> Travels With You.
            </h2>
            <p className="text-2xl font-light mb-12 opacity-80 max-w-2xl mx-auto">
              Each service is a testament to our dedication to excellence. We don't just fuel engines; we fuel your journey.
            </p>
            <Link to="/" className="inline-block px-12 py-5 bg-white text-brand-main font-black rounded-2xl hover:bg-brand-dark hover:text-white transition-all duration-300 shadow-2xl uppercase tracking-widest text-sm">
              Discover MIZGIN OIL
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
