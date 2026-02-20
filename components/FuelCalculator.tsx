
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';
import { useLanguage } from '../contexts/LanguageContext';
import { FuelType } from '../types';
import { Calculator as CalcIcon, RefreshCw } from 'lucide-react';

export const FuelCalculator: React.FC = () => {
  const { fuelPrices } = useAdmin();
  const { t, isRtl } = useLanguage();
  const [searchParams] = useSearchParams();
  
  const [selectedFuel, setSelectedFuel] = useState<string>(FuelType.NORMAL);
  const [amountIqd, setAmountIqd] = useState<string>('');
  const [liters, setLiters] = useState<string>('');
  const [activeInput, setActiveInput] = useState<'iqd' | 'liters'>('iqd');

  // Sync selected fuel with URL search params if present
  useEffect(() => {
    const typeFromUrl = searchParams.get('type');
    if (typeFromUrl && fuelPrices.length > 0) {
      const match = fuelPrices.find(f => f.type.toLowerCase() === typeFromUrl.toLowerCase());
      if (match) {
        setSelectedFuel(match.type);
      }
    }
  }, [searchParams, fuelPrices]);

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
    <div className={`glass rounded-[3rem] shadow-3xl overflow-hidden ${isRtl ? 'text-right' : 'text-left'}`}>
      <div className={`bg-brand-dark/40 p-10 text-white flex items-center justify-between ${isRtl ? 'flex-row-reverse' : ''}`}>
        <div className={`flex items-center ${isRtl ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
          <div className="p-3 bg-white/10 rounded-2xl border border-white/20">
            <CalcIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-black uppercase tracking-widest">{t('calc.title')}</h3>
            <p className="text-white/40 text-[10px] uppercase font-bold tracking-[0.2em]">{t('calc.subtitle')}</p>
          </div>
        </div>
        <motion.button 
          whileHover={{ rotate: 180 }}
          onClick={handleReset}
          className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors border border-white/10"
        >
          <RefreshCw className="h-5 w-5" />
        </motion.button>
      </div>

      <div className="p-8 md:p-10 space-y-10">
        <div>
          <label className="block text-[10px] font-black text-white mb-6 uppercase tracking-[0.3em] opacity-60">{t('calc.grade')}</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {fuelPrices.map((f) => {
              const fuelKey = f.type.toLowerCase().replace(/\s+/g, '_');
              const displayName = t(`fuel.${fuelKey}.name`) || f.type;

              return (
                <button
                  key={f.type}
                  onClick={() => setSelectedFuel(f.type)}
                  className={`group py-4 px-2 rounded-2xl border-2 transition-all relative overflow-hidden flex flex-col justify-center items-center h-24 ${
                    selectedFuel === f.type
                      ? 'border-white bg-white text-brand-dark shadow-xl scale-105'
                      : 'border-white/20 bg-white/5 text-white hover:border-white/40'
                  }`}
                >
                  <div className="relative z-10 w-full px-1 text-center">
                    <span className="block text-[9px] md:text-xs font-black uppercase tracking-tighter md:tracking-widest mb-1 leading-none break-words">
                      {displayName}
                    </span>
                    <span className={`block text-[9px] font-bold opacity-60`}>
                      {f.pricePerLiter} IQD
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <div className="relative">
            <label className="block text-[10px] font-black text-white mb-4 uppercase tracking-[0.3em] opacity-60">{t('calc.monetary')}</label>
            <div className="relative group">
              <input
                type="number"
                value={amountIqd}
                onChange={(e) => {
                  setActiveInput('iqd');
                  setAmountIqd(e.target.value);
                }}
                dir="ltr"
                className={`w-full bg-white/10 px-6 py-5 rounded-2xl border-2 border-white/10 focus:border-white focus:bg-white/20 focus:outline-none transition-all text-2xl font-black text-white ${isRtl ? 'text-right' : 'text-left'}`}
                placeholder="0"
              />
              <span className={`absolute top-1/2 -translate-y-1/2 text-white/30 font-black text-sm tracking-widest uppercase ${isRtl ? 'left-6' : 'right-6'}`}>IQD</span>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="h-px bg-white/10 flex-grow" />
            <div className="mx-4 p-2 bg-white/5 rounded-lg">
              <RefreshCw className="h-4 w-4 text-white opacity-20" />
            </div>
            <div className="h-px bg-white/10 flex-grow" />
          </div>

          <div className="relative">
            <label className="block text-[10px] font-black text-white mb-4 uppercase tracking-[0.3em] opacity-60">{t('calc.volume')}</label>
            <div className="relative group">
              <input
                type="number"
                value={liters}
                onChange={(e) => {
                  setActiveInput('liters');
                  setLiters(e.target.value);
                }}
                dir="ltr"
                className={`w-full bg-white/10 px-6 py-5 rounded-2xl border-2 border-white/10 focus:border-white focus:bg-white/20 focus:outline-none transition-all text-2xl font-black text-white ${isRtl ? 'text-right' : 'text-left'}`}
                placeholder="0.00"
              />
              <span className={`absolute top-1/2 -translate-y-1/2 text-white/30 font-black text-sm tracking-widest uppercase ${isRtl ? 'left-6' : 'right-6'}`}>L</span>
            </div>
          </div>
        </div>

        <motion.div 
          initial={false}
          animate={{ opacity: 1 }}
          className="bg-white/5 p-6 rounded-3xl border border-white/10"
        >
          <div className={`flex items-center justify-between ${isRtl ? 'flex-row-reverse' : ''}`}>
            <span className="text-xs font-bold text-white/40 uppercase tracking-widest">{t('calc.baseRate')}</span>
            <span className={`text-lg font-black text-white uppercase tracking-tight ${isRtl ? 'flex flex-row-reverse space-x-reverse space-x-2' : ''}`}>
              {currentPrice} <span className={`text-white/20 text-[10px] ${isRtl ? 'mr-2' : 'ml-2'}`}>IQD/L</span>
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
