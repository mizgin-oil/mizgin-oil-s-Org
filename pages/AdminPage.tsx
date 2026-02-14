import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAdmin } from '../contexts/AdminContext';
import { FuelType } from '../types';
import { Lock, LogOut, Save, Fuel, Coffee, Droplets, Phone, CheckCircle, AlertCircle } from 'lucide-react';

const AdminPage: React.FC = () => {
  const { fuelPrices, services, coffeeMenu, contactPhone, updateFuelPrice, updateServicePrice, updateCoffeePrice, updatePhone } = useAdmin();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'mizgin.oil.duhok@gmail.com' && password === '@@##2323@#@#') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials. Please try again.');
    }
  };

  const notify = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center px-4 pt-24">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-3xl"
        >
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 mb-6 bg-brand-main/10 rounded-2xl flex items-center justify-center">
              <Lock className="w-10 h-10 text-brand-main" />
            </div>
            <h1 className="text-2xl font-black text-brand-dark uppercase tracking-widest">Admin Access</h1>
            <p className="text-brand-gray text-xs font-bold uppercase tracking-widest mt-2 opacity-60">Mizgin Oil Dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-brand-main mb-2 uppercase tracking-[0.2em]">Admin</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-brand-light px-5 py-4 rounded-xl border-2 border-transparent focus:border-brand-main focus:bg-white focus:outline-none transition-all font-bold"
                placeholder="Admin"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-brand-main mb-2 uppercase tracking-[0.2em]">Security Key</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-brand-light px-5 py-4 rounded-xl border-2 border-transparent focus:border-brand-main focus:bg-white focus:outline-none transition-all font-bold"
                placeholder="••••••••"
                required
              />
            </div>
            {loginError && (
              <p className="text-red-500 text-xs font-bold uppercase flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" /> {loginError}
              </p>
            )}
            <button 
              type="submit"
              className="w-full bg-brand-dark text-white font-black py-5 rounded-xl hover:bg-brand-main transition-all uppercase tracking-[0.2em] text-xs shadow-xl"
            >
              Unlock Dashboard
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-brand-light min-h-screen pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="flex items-center space-x-6">
            <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-brand-light">
              <Fuel className="h-8 w-8 text-brand-main" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-brand-dark uppercase tracking-tighter">Control <span className="text-brand-main">Panel</span></h1>
              <p className="text-brand-gray text-sm font-bold uppercase tracking-widest opacity-60">System Configuration & Pricing</p>
            </div>
          </div>
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center space-x-3 px-6 py-3 bg-white text-brand-dark font-bold rounded-2xl hover:bg-red-50 hover:text-red-600 transition-all border border-transparent hover:border-red-100 uppercase tracking-widest text-xs shadow-sm"
          >
            <LogOut className="h-4 w-4" />
            <span>Secure Logout</span>
          </button>
        </div>

        {successMsg && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed top-28 right-8 z-50 bg-brand-main text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-3 font-bold uppercase text-xs tracking-widest"
          >
            <CheckCircle className="h-5 w-5" />
            <span>{successMsg}</span>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Fuel Prices Section */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-3xl border border-white">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-12 bg-brand-main/10 rounded-xl flex items-center justify-center">
                <Fuel className="h-6 w-6 text-brand-main" />
              </div>
              <h2 className="text-xl font-black text-brand-dark uppercase tracking-widest">Fuel Rates (per L)</h2>
            </div>
            <div className="space-y-6">
              {fuelPrices.map((fuel) => (
                <div key={fuel.type} className="flex items-center justify-between group">
                  <span className="text-sm font-bold text-brand-gray uppercase tracking-widest">{fuel.type}</span>
                  <div className="flex items-center space-x-4">
                    <input 
                      type="number"
                      defaultValue={fuel.pricePerLiter}
                      onBlur={(e) => {
                        updateFuelPrice(fuel.type, parseInt(e.target.value));
                        notify(`${fuel.type} updated`);
                      }}
                      className="w-32 bg-brand-light px-4 py-3 rounded-xl border-2 border-transparent focus:border-brand-main focus:bg-white text-right font-black"
                    />
                    <span className="text-[10px] font-black text-brand-gray/40 uppercase">IQD</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Car Wash Section */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-3xl border border-white">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-12 bg-brand-main/10 rounded-xl flex items-center justify-center">
                <Droplets className="h-6 w-6 text-brand-main" />
              </div>
              <h2 className="text-xl font-black text-brand-dark uppercase tracking-widest">Service Rates</h2>
            </div>
            <div className="space-y-6">
              {services.filter(s => s.id === 'car-wash').map((service) => (
                <div key={service.id} className="flex items-center justify-between group">
                  <span className="text-sm font-bold text-brand-gray uppercase tracking-widest">{service.name}</span>
                  <div className="flex items-center space-x-4">
                    <input 
                      type="number"
                      defaultValue={service.price || 5000}
                      onBlur={(e) => {
                        updateServicePrice(service.id, parseInt(e.target.value));
                        notify('Wash price updated');
                      }}
                      className="w-32 bg-brand-light px-4 py-3 rounded-xl border-2 border-transparent focus:border-brand-main focus:bg-white text-right font-black"
                    />
                    <span className="text-[10px] font-black text-brand-gray/40 uppercase">IQD</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Coffee Menu Section */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-3xl border border-white">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-12 bg-brand-main/10 rounded-xl flex items-center justify-center">
                <Coffee className="h-6 w-6 text-brand-main" />
              </div>
              <h2 className="text-xl font-black text-brand-dark uppercase tracking-widest">Coffee Menu</h2>
            </div>
            <div className="space-y-6 max-h-[300px] overflow-y-auto pr-2 custom-scroll">
              {coffeeMenu.map((item) => (
                <div key={item.id} className="flex items-center justify-between group">
                  <span className="text-sm font-bold text-brand-gray uppercase tracking-widest">{item.name}</span>
                  <div className="flex items-center space-x-4">
                    <input 
                      type="number"
                      defaultValue={item.price}
                      onBlur={(e) => {
                        updateCoffeePrice(item.id, parseInt(e.target.value));
                        notify(`${item.name} price updated`);
                      }}
                      className="w-32 bg-brand-light px-4 py-3 rounded-xl border-2 border-transparent focus:border-brand-main focus:bg-white text-right font-black"
                    />
                    <span className="text-[10px] font-black text-brand-gray/40 uppercase">IQD</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-3xl border border-white">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-12 bg-brand-main/10 rounded-xl flex items-center justify-center">
                <Phone className="h-6 w-6 text-brand-main" />
              </div>
              <h2 className="text-xl font-black text-brand-dark uppercase tracking-widest">Communications</h2>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-brand-main mb-2 uppercase tracking-[0.2em]">Contact Phone Number</label>
                <div className="flex items-center space-x-4">
                  <input 
                    type="text"
                    defaultValue={contactPhone}
                    onBlur={(e) => {
                      updatePhone(e.target.value);
                      notify('Phone number updated');
                    }}
                    className="w-full bg-brand-light px-4 py-4 rounded-xl border-2 border-transparent focus:border-brand-main focus:bg-white font-black"
                  />
                  <Save className="h-5 w-5 text-brand-gray/20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
