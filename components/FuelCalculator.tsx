
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAdmin } from '../contexts/AdminContext';
import { useLanguage } from '../contexts/LanguageContext';
import { FuelType } from '../types';
import { Calculator as CalcIcon, RefreshCw } from 'lucide-react';

export const FuelCalculator: React.FC = () => {
  const { fuelPrices } = useAdmin();
  const { t, isRtl } = useLanguage();
  const [selectedFuel, setSelectedFuel] = useState<string>(FuelType.NORMAL);
  const [amountIqd, setAmountIqd] = useState<string>('');
  const [liters, setLiters] = useState<string>('');
  const [activeInput, setActiveInput] = useState<'iqd' | 'liters'>('iqd');

  const currentPrice = fuelPrices.find(f => f.type === selectedFuel)?.pricePerLiter || 0;

  useEffect(() => {
    if (activeInput === 'iqd' && amountIqd) {
      const val = parseFloat(amountIqd);
      if (!isNaN(val)) {
        setLiters((val / currentPrice).toFixed(2));
      } else {
        setLiters('');
      }
    }
  }, [amountIqd, currentPrice, activeInput]);

  useEffect(() => {
    if (activeInput === 'liters' && liters) {
      const val = parseFloat(liters);
      if (!isNaN(val)) {
        setAmountIqd((val * currentPrice).toFixed(0));
      } else {
        setAmountIqd('');
      }
    }
  }, [liters, currentPrice, activeInput]);

  const handleReset = () => {
    setAmountIqd('');
    setLiters('');
  };

  return (
    <div className={`bg-white rounded-[3rem] shadow-3xl overflow-hidden border border-white/20 ${isRtl ? 'text-right' : 'text-left'}`}>
      <div className={`bg-brand-gray p-10 text-white flex items-center justify-between ${isRtl ? 'flex-row-reverse' : ''}`}>
        <div className={`flex items-center ${isRtl ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
          <div className="p-3 bg-brand-main/20 rounded-2xl border border-brand-main/30">
            <CalcIcon className="h-6 w-6 text-brand-main" />
          </div>
          <div>
            <h3 className="text-xl font-black uppercase tracking-widest">{t('calc.title')}</h3>
            <p className="text-brand-light/40 text-[10px] uppercase font-bold tracking-[0.2em]">{t('calc.subtitle')}</p>
          </div>
        </div>
        <motion.button 
          whileHover={{ rotate: 180 }}
          onClick={handleReset}
          className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors border border-white/5"
        >
          <RefreshCw className="h-5 w-5" />
        </motion.button>
      </div>

      <div className="p-10 space-y-10">
        <div>
          <label className="block text-[10px] font-black text-brand-main mb-6 uppercase tracking-[0.3em]">{t('calc.grade')}</label>
          <div className="grid grid-cols-3 gap-3">
            {fuelPrices.map((f) => (
              <button
                key={f.type}
                onClick={() => setSelectedFuel(f.type)}
                className={`group py-5 px-3 rounded-2xl border-2 transition-all relative overflow-hidden ${
                  selectedFuel === f.type
                    ? 'border-brand-main bg-brand-main text-white shadow-xl scale-105'
                    : 'border-brand-light bg-brand-light/30 text-brand-gray hover:border-brand-main/30'
                }`}
              >
                <div className="relative z-10">
                  <span className="block text-xs font-black uppercase tracking-widest mb-1">{f.type}</span>
                  <span className={`block text-[10px] font-bold opacity-60 ${selectedFuel === f.type ? 'text-white' : ''}`}>
                    {f.pricePerLiter} IQD
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <div className="relative">
            <label className="block text-[10px] font-black text-brand-main mb-4 uppercase tracking-[0.3em]">{t('calc.monetary')}</label>
            <div className="relative group">
              <input
                type="number"
                value={amountIqd}
                onChange={(e) => {
                  setActiveInput('iqd');
                  setAmountIqd(e.target.value);
                }}
                dir="ltr"
                className={`w-full bg-brand-light/30 px-6 py-5 rounded-2xl border-2 border-transparent focus:border-brand-main focus:bg-white focus:outline-none transition-all text-2xl font-black text-brand-dark ${isRtl ? 'text-right' : 'text-left'}`}
                placeholder="0"
              />
              <span className={`absolute top-1/2 -translate-y-1/2 text-brand-gray/30 font-black text-sm tracking-widest uppercase ${isRtl ? 'left-6' : 'right-6'}`}>IQD</span>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="h-px bg-brand-gray/10 flex-grow" />
            <div className="mx-4 p-2 bg-brand-light rounded-lg">
              <RefreshCw className="h-4 w-4 text-brand-gray opacity-20" />
            </div>
            <div className="h-px bg-brand-gray/10 flex-grow" />
          </div>

          <div className="relative">
            <label className="block text-[10px] font-black text-brand-main mb-4 uppercase tracking-[0.3em]">{t('calc.volume')}</label>
            <div className="relative group">
              <input
                type="number"
                value={liters}
                onChange={(e) => {
                  setActiveInput('liters');
                  setLiters(e.target.value);
                }}
                dir="ltr"
                className={`w-full bg-brand-light/30 px-6 py-5 rounded-2xl border-2 border-transparent focus:border-brand-main focus:bg-white focus:outline-none transition-all text-2xl font-black text-brand-dark ${isRtl ? 'text-right' : 'text-left'}`}
                placeholder="0.00"
              />
              <span className={`absolute top-1/2 -translate-y-1/2 text-brand-gray/30 font-black text-sm tracking-widest uppercase ${isRtl ? 'left-6' : 'right-6'}`}>L</span>
            </div>
          </div>
        </div>

        <motion.div 
          initial={false}
          animate={{ opacity: 1 }}
          className="bg-brand-dark/5 p-6 rounded-3xl border border-brand-dark/5"
        >
          <div className={`flex items-center justify-between ${isRtl ? 'flex-row-reverse' : ''}`}>
            <span className="text-xs font-bold text-brand-gray uppercase tracking-widest">{t('calc.baseRate')}</span>
            <span className={`text-lg font-black text-brand-dark uppercase tracking-tight ${isRtl ? 'flex flex-row-reverse space-x-reverse space-x-2' : ''}`}>
              {currentPrice} <span className={`text-brand-gray text-[10px] opacity-40 ${isRtl ? 'mr-2' : 'ml-2'}`}>IQD/L</span>
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
