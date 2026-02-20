
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '../contexts/AdminContext';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  Lock, LogOut, Fuel, Phone, CheckCircle, Plus, 
  Trash2, X, LayoutGrid, Loader2, Save, ShoppingBag, 
  PlusCircle, AlertCircle, TrendingUp, ShieldCheck
} from 'lucide-react';

const AdminPage: React.FC = () => {
  const { 
    fuelPrices, 
    customSections,
    contactPhone, 
    updateFuelPrice, 
    addFuelPrice,
    removeFuelPrice,
    addCustomSection,
    removeCustomSection,
    addItemToCustomSection,
    removeItemFromCustomSection,
    updateItemInCustomSectionPrice,
    updatePhone,
    refreshData
  } = useAdmin();
  
  const { t, isRtl } = useLanguage();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Local Buffers for editing
  const [editedFuelPrices, setEditedFuelPrices] = useState<Record<string, number>>({});
  const [editedItemPrices, setEditedItemPrices] = useState<Record<string, number>>({});

  // UI States for Modals/Forms
  const [showAddFuel, setShowAddFuel] = useState(false);
  const [newFuelType, setNewFuelType] = useState('');
  const [newFuelPrice, setNewFuelPrice] = useState('');

  const [showAddSection, setShowAddSection] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState('');

  const [activeItemSectionId, setActiveItemSectionId] = useState<string | null>(null);
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Hardcoded credentials as requested by standard operations
    if (email === 'mizgin.oil.duhok@gmail.com' && password === '@@##2323@#@#') {
      setIsAuthenticated(true);
      setLoginError('');
      notify(t('admin.dashboardUnlocked'));
    } else {
      setLoginError('Security violation: Invalid credentials.');
    }
  };

  const notify = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleAddFuel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFuelType || !newFuelPrice) return;
    try {
      setIsProcessing(true);
      await addFuelPrice(newFuelType, parseInt(newFuelPrice), 'Premium operational fuel grade.');
      notify(`${newFuelType} initialized successfully.`);
      setNewFuelType('');
      setNewFuelPrice('');
      setShowAddFuel(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddSection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSectionTitle) return;
    try {
      setIsProcessing(true);
      await addCustomSection(newSectionTitle);
      notify(`Category "${newSectionTitle}" deployed.`);
      setNewSectionTitle('');
      setShowAddSection(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddItemToSection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeItemSectionId || !newItemName || !newItemPrice) return;
    try {
      setIsProcessing(true);
      await addItemToCustomSection(activeItemSectionId, newItemName, parseInt(newItemPrice));
      notify(`New service "${newItemName}" added to registry.`);
      setNewItemName('');
      setNewItemPrice('');
      setActiveItemSectionId(null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBatchSaveFuels = async () => {
    try {
      setIsProcessing(true);
      const updates = Object.entries(editedFuelPrices);
      await Promise.all(updates.map(([type, price]) => updateFuelPrice(type, price)));
      setEditedFuelPrices({});
      notify("Fuel grid pricing updated successfully.");
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBatchSaveItems = async (sectionId: string) => {
    try {
      setIsProcessing(true);
      const section = customSections.find(s => s.id === sectionId);
      if (!section) return;

      const itemsToUpdate = section.items.filter(item => editedItemPrices[item.id] !== undefined);
      await Promise.all(itemsToUpdate.map(item => 
        updateItemInCustomSectionPrice(sectionId, item.id, editedItemPrices[item.id])
      ));
      
      const newBuffer = { ...editedItemPrices };
      itemsToUpdate.forEach(item => delete newBuffer[item.id]);
      setEditedItemPrices(newBuffer);
      
      notify(`Services in ${t(section.title)} updated.`);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen bg-brand-light flex items-center justify-center px-4 pt-24 ${isRtl ? 'rtl' : 'ltr'}`}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-lg glass-dark rounded-[4rem] p-12 shadow-3xl border border-white/10"
        >
          <div className="flex flex-col items-center mb-12">
            <div className="w-24 h-24 mb-8 bg-brand-main rounded-[2.5rem] flex items-center justify-center shadow-2xl">
              <ShieldCheck className="w-12 h-12 text-brand-dark" />
            </div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter text-center">Operational <span className="text-brand-main">Access</span></h1>
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.6em] mt-4">Mizgin Oil Secure Terminal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-brand-main uppercase tracking-[0.3em] px-4">Authorized Identity</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 px-8 py-6 rounded-[2rem] border-2 border-transparent focus:border-brand-main/30 focus:bg-white/10 focus:outline-none transition-all font-bold text-white placeholder-white/20"
                placeholder="mizgin.admin@terminal.com"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-brand-main uppercase tracking-[0.3em] px-4">Access Protocol</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 px-8 py-6 rounded-[2rem] border-2 border-transparent focus:border-brand-main/30 focus:bg-white/10 focus:outline-none transition-all font-bold text-white placeholder-white/20"
                placeholder="••••••••••••"
                required
              />
            </div>
            {loginError && (
              <div className="flex items-center space-x-3 bg-red-500/10 p-5 rounded-2xl text-red-400 border border-red-500/20">
                <AlertCircle className="h-5 w-5" />
                <p className="text-xs font-black uppercase tracking-widest">{loginError}</p>
              </div>
            )}
            <button type="submit" className="w-full bg-brand-main text-brand-dark font-black py-7 rounded-[2rem] hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-[0.5em] text-xs shadow-3xl mt-6">
              Establish Connection
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`bg-brand-light min-h-screen pt-36 pb-32 ${isRtl ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Dashboard Header */}
        <div className={`flex flex-col md:flex-row justify-between items-start md:items-center mb-20 gap-8 ${isRtl ? 'md:flex-row-reverse' : ''}`}>
          <div className={`flex items-center space-x-8 ${isRtl ? 'space-x-reverse' : ''}`}>
            <div className="w-20 h-20 bg-brand-dark rounded-[2rem] flex items-center justify-center shadow-3xl border border-white/10">
              <LayoutGrid className="h-10 w-10 text-brand-main" />
            </div>
            <div>
              <h1 className="text-5xl font-black text-white uppercase tracking-tighter leading-none">
                Master <span className="text-brand-dark">Control</span>
              </h1>
              <div className="flex items-center mt-3">
                 {isProcessing ? (
                   <div className="flex items-center text-brand-dark/60 font-black text-[10px] uppercase tracking-[0.4em]">
                     <Loader2 className="h-4 w-4 animate-spin mr-3" />
                     Synchronizing Data...
                   </div>
                 ) : (
                   <div className="flex items-center text-white/40 font-black text-[10px] uppercase tracking-[0.4em]">
                     <TrendingUp className="h-3 w-3 mr-3 text-brand-main" />
                     Live Terminal Status: Optimal
                   </div>
                 )}
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsAuthenticated(false)} 
            className="px-10 py-5 glass-dark text-white font-black rounded-2xl hover:bg-red-500 transition-all shadow-2xl uppercase tracking-[0.3em] text-[10px] border border-white/5"
          >
            Terminal Shutdown
          </button>
        </div>

        {/* Floating Success Toast */}
        <AnimatePresence>
          {successMsg && (
            <motion.div initial={{ opacity: 0, y: 20, x: 20 }} animate={{ opacity: 1, y: 0, x: 0 }} exit={{ opacity: 0, scale: 0.9 }} className="fixed bottom-12 right-12 z-[100] bg-brand-dark text-white px-10 py-6 rounded-[2.5rem] shadow-3xl flex items-center space-x-6 font-black uppercase text-xs tracking-[0.2em] border border-brand-main/30">
              <CheckCircle className="h-6 w-6 text-brand-main" />
              <span>{successMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Module: Fuel Grid Management */}
          <div className="glass rounded-[4rem] p-12 shadow-3xl border border-white/10 h-full flex flex-col">
            <div className={`flex items-center justify-between mb-12 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center space-x-6 ${isRtl ? 'space-x-reverse' : ''}`}>
                <div className="p-5 bg-white/10 rounded-3xl">
                  <Fuel className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Fuel Pricing</h2>
                  <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em] mt-2">Core Energy Logistics</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {Object.keys(editedFuelPrices).length > 0 && (
                  <button onClick={handleBatchSaveFuels} className="p-4 bg-brand-main text-brand-dark rounded-2xl hover:scale-110 transition-transform shadow-2xl">
                    <Save className="h-6 w-6" />
                  </button>
                )}
                <button onClick={() => setShowAddFuel(!showAddFuel)} className="p-4 bg-white/5 hover:bg-white/20 rounded-2xl transition-all border border-white/10">
                  {showAddFuel ? <X className="h-6 w-6" /> : <PlusCircle className="h-6 w-6" />}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {showAddFuel && (
                <motion.form 
                  initial={{ height: 0, opacity: 0 }} 
                  animate={{ height: 'auto', opacity: 1 }} 
                  exit={{ height: 0, opacity: 0 }} 
                  onSubmit={handleAddFuel} 
                  className="mb-12 p-10 bg-brand-dark/30 rounded-[3rem] space-y-6 overflow-hidden border border-white/5"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase text-white/40 tracking-widest px-2">Label</label>
                      <input type="text" value={newFuelType} onChange={e => setNewFuelType(e.target.value)} placeholder="e.g. Ultra Diesel" className="bg-white/5 p-6 rounded-2xl w-full font-bold text-white border border-white/10 outline-none focus:border-brand-main/40" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase text-white/40 tracking-widest px-2">Price/L</label>
                      <input type="number" value={newFuelPrice} onChange={e => setNewFuelPrice(e.target.value)} placeholder="0" className="bg-white/5 p-6 rounded-2xl w-full font-bold text-white border border-white/10 outline-none focus:border-brand-main/40" required />
                    </div>
                  </div>
                  <button type="submit" disabled={isProcessing} className="w-full bg-white text-brand-dark py-6 rounded-2xl font-black uppercase text-[11px] tracking-[0.5em] shadow-2xl transition-all hover:bg-brand-main">
                    Deploy Fuel Grade
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

            <div className="space-y-6 flex-grow">
              {fuelPrices.map(fuel => (
                <div key={fuel.type} className={`p-8 rounded-[2.5rem] bg-white/5 group border border-white/5 hover:bg-white/10 transition-all flex flex-col md:flex-row items-center justify-between gap-6 ${isRtl ? 'md:flex-row-reverse' : ''}`}>
                  <div className={`flex items-center space-x-6 ${isRtl ? 'space-x-reverse' : ''}`}>
                    <button onClick={() => confirm(`Permanently decommission ${fuel.type}?`) && removeFuelPrice(fuel.type)} className="p-3 text-white/20 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all">
                      <Trash2 className="h-5 w-5" />
                    </button>
                    <span className="font-black uppercase text-lg text-white tracking-tighter">{t(`fuel.${fuel.type.toLowerCase().replace(/\s+/g, '_')}.name`) || fuel.type}</span>
                  </div>
                  <div className="relative w-full md:w-56">
                    <input 
                      type="number" 
                      value={editedFuelPrices[fuel.type] !== undefined ? editedFuelPrices[fuel.type] : fuel.pricePerLiter} 
                      onChange={e => {
                        const val = e.target.value === '' ? fuel.pricePerLiter : parseInt(e.target.value);
                        setEditedFuelPrices({ ...editedFuelPrices, [fuel.type]: val });
                      }}
                      className={`bg-brand-dark/40 px-8 py-5 rounded-2xl w-full font-black text-brand-main focus:ring-4 focus:ring-brand-main/10 outline-none transition-all text-xl ${isRtl ? 'text-left' : 'text-right'}`} 
                    />
                    <span className={`absolute top-1/2 -translate-y-1/2 text-[10px] font-black text-white/20 uppercase pointer-events-none ${isRtl ? 'left-6' : 'right-6'}`}>IQD/L</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Module: Service Architecture */}
          <div className="space-y-16">
            <div className="bg-brand-dark text-white rounded-[4rem] p-12 shadow-3xl relative overflow-hidden flex flex-col justify-center border border-white/10">
              <div className="absolute -top-24 -right-24 w-80 h-80 bg-brand-main/10 blur-[100px] rounded-full" />
              <div className={`relative z-10 flex items-center justify-between mb-12 ${isRtl ? 'flex-row-reverse' : ''}`}>
                <div className={`flex items-center space-x-8 ${isRtl ? 'space-x-reverse' : ''}`}>
                  <div className="w-20 h-20 bg-white/10 rounded-[2.5rem] flex items-center justify-center border border-white/10">
                    <ShoppingBag className="h-10 w-10 text-brand-main" />
                  </div>
                  <div>
                    <h2 className="text-4xl font-black uppercase tracking-tighter">Deploy Category</h2>
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.5em] mt-2">Operational Hierarchy</p>
                  </div>
                </div>
                <button onClick={() => setShowAddSection(!showAddSection)} className="p-6 bg-white/5 hover:bg-white/10 rounded-3xl transition-all border border-white/10">
                  {showAddSection ? <X className="h-8 w-8" /> : <Plus className="h-8 w-8" />}
                </button>
              </div>
              
              <AnimatePresence>
                {showAddSection && (
                  <motion.form 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: 'auto', opacity: 1 }} 
                    exit={{ height: 0, opacity: 0 }} 
                    onSubmit={handleAddSection} 
                    className="space-y-6 overflow-hidden relative z-10"
                  >
                    <input 
                      type="text" 
                      value={newSectionTitle} 
                      onChange={e => setNewSectionTitle(e.target.value)} 
                      placeholder="e.g. Executive Car Wash" 
                      className={`bg-white/5 p-8 rounded-[2.5rem] w-full font-black text-white placeholder-white/10 border border-white/5 outline-none focus:border-brand-main/30 transition-all text-2xl ${isRtl ? 'text-right' : 'text-left'}`} 
                      required 
                    />
                    <button type="submit" disabled={isProcessing} className="w-full bg-white text-brand-dark py-7 rounded-[2.5rem] font-black uppercase text-xs tracking-[0.6em] shadow-3xl hover:bg-brand-main transition-all">
                      Construct Environment
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
              {!showAddSection && (
                 <p className="text-white/10 text-[9px] font-black uppercase tracking-[0.8em] text-center mt-8">Manual Entry Node Locked</p>
              )}
            </div>

            {/* Global Access Node */}
            <div className="bg-white rounded-[4rem] p-12 shadow-3xl border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-light/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150" />
              <div className={`flex items-center space-x-8 mb-12 ${isRtl ? 'space-x-reverse' : ''}`}>
                <div className="w-16 h-16 bg-brand-light/10 rounded-[1.8rem] flex items-center justify-center">
                  <Phone className="h-8 w-8 text-brand-dark" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-brand-dark uppercase tracking-tighter">Contact Node</h2>
                  <p className="text-[10px] font-bold text-brand-dark/20 uppercase tracking-[0.5em] mt-2">Master Broadcast Number</p>
                </div>
              </div>
              <div className="relative">
                <input 
                  type="text" 
                  defaultValue={contactPhone} 
                  onBlur={e => { updatePhone(e.target.value); notify("Global contact info updated."); }} 
                  className={`w-full bg-brand-gray/50 px-10 py-8 rounded-[2.5rem] border-2 border-transparent focus:border-brand-dark/10 focus:bg-white focus:outline-none transition-all font-black text-brand-dark text-4xl ${isRtl ? 'text-right' : 'text-left'}`} 
                  dir="ltr" 
                />
              </div>
              <p className="text-[10px] font-bold text-brand-dark/30 uppercase tracking-[0.5em] mt-10 text-center">Propagates across all digital interfaces.</p>
            </div>
          </div>

          {/* Module: Dynamic Categories Content */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-16">
            {customSections.map(section => {
              const itemsInSection = section.items.map(i => i.id);
              const hasDirtyPrices = itemsInSection.some(id => editedItemPrices[id] !== undefined && editedItemPrices[id] !== section.items.find(i => i.id === id)?.price);

              return (
                <div key={section.id} className="bg-white rounded-[4rem] p-12 shadow-3xl border-t-[16px] border-brand-dark flex flex-col h-full">
                  <div className={`flex items-center justify-between mb-12 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex items-center space-x-6 ${isRtl ? 'space-x-reverse' : ''}`}>
                      <div className="w-16 h-16 bg-brand-dark/5 rounded-[1.8rem] flex items-center justify-center">
                        <ShoppingBag className="h-7 w-7 text-brand-dark" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-black text-brand-dark uppercase tracking-tight">{t(section.title)}</h2>
                        <p className="text-[10px] font-bold text-brand-dark/30 uppercase tracking-[0.4em] mt-2">{section.items.length} ACTIVE SERVICES</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {hasDirtyPrices && (
                        <button onClick={() => handleBatchSaveItems(section.id)} className="p-4 bg-brand-dark text-white rounded-2xl hover:bg-brand-main hover:text-brand-dark transition-all shadow-xl">
                          <Save className="h-5 w-5" />
                        </button>
                      )}
                      <button onClick={() => setActiveItemSectionId(activeItemSectionId === section.id ? null : section.id)} className="p-4 bg-brand-gray hover:bg-brand-dark/10 rounded-2xl text-brand-dark transition-all">
                        {activeItemSectionId === section.id ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                      </button>
                      <button onClick={() => confirm(`Permanently dissolve ${t(section.title)}?`) && removeCustomSection(section.id)} className="p-4 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl transition-all">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <AnimatePresence>
                    {activeItemSectionId === section.id && (
                      <motion.form 
                        initial={{ height: 0, opacity: 0 }} 
                        animate={{ height: 'auto', opacity: 1 }} 
                        exit={{ height: 0, opacity: 0 }} 
                        onSubmit={handleAddItemToSection} 
                        className="mb-12 p-8 bg-brand-gray rounded-[2.5rem] space-y-6 overflow-hidden border border-brand-dark/5 shadow-inner"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[9px] font-black uppercase text-brand-dark/40 tracking-widest px-2">Label</label>
                            <input type="text" value={newItemName} onChange={e => setNewItemName(e.target.value)} placeholder="e.g. Service Name" className="bg-white p-5 rounded-2xl w-full font-bold text-brand-dark border border-brand-dark/5 outline-none focus:border-brand-dark/20" required />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[9px] font-black uppercase text-brand-dark/40 tracking-widest px-2">Price IQD</label>
                            <input type="number" value={newItemPrice} onChange={e => setNewItemPrice(e.target.value)} placeholder="0" className="bg-white p-5 rounded-2xl w-full font-bold text-brand-dark border border-brand-dark/5 outline-none focus:border-brand-dark/20" required />
                          </div>
                        </div>
                        <button type="submit" disabled={isProcessing} className="w-full bg-brand-dark text-white py-6 rounded-2xl font-black uppercase text-[10px] tracking-[0.5em] shadow-xl hover:bg-brand-main hover:text-brand-dark transition-all">
                          Inject Registry Item
                        </button>
                      </motion.form>
                    )}
                  </AnimatePresence>

                  <div className="space-y-4 flex-grow">
                    {section.items.map(item => (
                      <div key={item.id} className={`flex justify-between items-center p-6 rounded-[2rem] bg-brand-gray/30 group border border-transparent hover:border-brand-dark/5 transition-all ${isRtl ? 'flex-row-reverse' : ''}`}>
                        <div className={`flex items-center space-x-5 ${isRtl ? 'space-x-reverse' : ''}`}>
                          <button onClick={() => confirm(`Erase ${t(item.name)} from history?`) && removeItemFromCustomSection(section.id, item.id)} className="p-3 text-brand-dark/20 hover:text-red-500 hover:bg-white rounded-xl transition-all">
                            <Trash2 className="h-4 w-4" />
                          </button>
                          <span className="font-black uppercase text-sm text-brand-dark tracking-tight leading-none">{t(item.name)}</span>
                        </div>
                        <div className="relative">
                          <input 
                            type="number" 
                            value={editedItemPrices[item.id] !== undefined ? editedItemPrices[item.id] : item.price} 
                            onChange={e => {
                              const val = e.target.value === '' ? item.price : parseInt(e.target.value);
                              setEditedItemPrices({ ...editedItemPrices, [item.id]: val });
                            }}
                            className={`bg-white px-8 py-4 rounded-xl w-40 font-black text-brand-dark focus:ring-4 focus:ring-brand-dark/5 outline-none transition-all text-lg ${isRtl ? 'text-left' : 'text-right'}`} 
                          />
                          <span className={`absolute top-1/2 -translate-y-1/2 text-[10px] font-black text-brand-dark/20 uppercase pointer-events-none ${isRtl ? 'left-4' : 'right-4'}`}>IQD</span>
                        </div>
                      </div>
                    ))}
                    {section.items.length === 0 && (
                      <div className="text-center py-20 border-4 border-dashed border-brand-dark/5 rounded-[3rem]">
                        <Plus className="h-10 w-10 text-brand-dark/10 mx-auto mb-4" />
                        <p className="text-brand-dark/10 text-[10px] font-black uppercase tracking-[0.6em]">Registry Void</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
