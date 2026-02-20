
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '../contexts/AdminContext';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  Lock, LogOut, Fuel, Phone, CheckCircle, Plus, 
  Trash2, X, LayoutGrid, Loader2, Save, ShoppingBag, 
  PlusCircle, AlertCircle
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
    updatePhone 
  } = useAdmin();
  
  const { t, isRtl } = useLanguage();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Buffers for unsaved edits
  const [editedFuelPrices, setEditedFuelPrices] = useState<Record<string, number>>({});
  const [editedItemPrices, setEditedItemPrices] = useState<Record<string, number>>({});

  // UI State for Creating New Entities
  const [showAddFuel, setShowAddFuel] = useState(false);
  const [newFuelType, setNewFuelType] = useState('');
  const [newFuelPrice, setNewFuelPrice] = useState('');

  const [showAddSection, setShowAddSection] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState('');

  const [newItemSectionId, setNewItemSectionId] = useState<string | null>(null);
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'mizgin.oil.duhok@gmail.com' && password === '@@##2323@#@#') {
      setIsAuthenticated(true);
      setLoginError('');
      notify(t('admin.dashboardUnlocked'));
    } else {
      setLoginError('Invalid credentials. Please try again.');
    }
  };

  const notify = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleAddFuel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newFuelType && newFuelPrice) {
      try {
        setIsProcessing(true);
        await addFuelPrice(newFuelType, parseInt(newFuelPrice), 'Premium fuel grade.');
        notify(`${newFuelType} Added`);
        setNewFuelType('');
        setNewFuelPrice('');
        setShowAddFuel(false);
      } catch (err) {
        console.error(err);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleAddSection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newSectionTitle) {
      try {
        setIsProcessing(true);
        await addCustomSection(newSectionTitle);
        notify(`Category "${newSectionTitle}" Created`);
        setNewSectionTitle('');
        setShowAddSection(false);
      } catch (err) {
        console.error(err);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleAddItemToSection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemSectionId && newItemName && newItemPrice) {
      try {
        setIsProcessing(true);
        await addItemToCustomSection(newItemSectionId, newItemName, parseInt(newItemPrice));
        notify(`Item "${newItemName}" Added`);
        setNewItemName('');
        setNewItemPrice('');
        setNewItemSectionId(null);
      } catch (err) {
        console.error(err);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleSaveFuels = async () => {
    try {
      setIsProcessing(true);
      const updates = Object.entries(editedFuelPrices);
      for (const [type, price] of updates) {
        await updateFuelPrice(type, price);
      }
      setEditedFuelPrices({});
      notify(t('admin.settingsSaved'));
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSaveItems = async (sectionId: string) => {
    try {
      setIsProcessing(true);
      const section = customSections.find(s => s.id === sectionId);
      if (!section) return;

      const itemsInThisSection = section.items.map(i => i.id);
      const updates = Object.entries(editedItemPrices).filter(([id]) => itemsInThisSection.includes(id));
      
      for (const [id, price] of updates) {
        await updateItemInCustomSectionPrice(sectionId, id, price);
        const newPrices = { ...editedItemPrices };
        delete newPrices[id];
        setEditedItemPrices(newPrices);
      }
      notify(t('admin.settingsSaved'));
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
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white rounded-[3rem] p-10 shadow-3xl border border-brand-dark/10"
        >
          <div className="flex flex-col items-center mb-10">
            <div className="w-20 h-20 mb-6 bg-brand-dark rounded-[2rem] flex items-center justify-center shadow-2xl">
              <Lock className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-black text-brand-dark uppercase tracking-widest text-center">{t('admin.access')}</h1>
            <p className="text-[10px] font-bold text-brand-dark/40 uppercase tracking-[0.4em] mt-3">Mizgin Oil Management Portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className={`block text-[10px] font-black text-brand-dark mb-2 uppercase tracking-[0.2em] opacity-80 ${isRtl ? 'text-right' : 'text-left'}`}>{t('admin.email')}</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full bg-brand-gray px-6 py-5 rounded-[1.5rem] border-2 border-transparent focus:border-brand-dark/10 focus:bg-white focus:outline-none transition-all font-bold text-brand-dark placeholder-brand-dark/20 ${isRtl ? 'text-right' : 'text-left'}`}
                placeholder="mizgin.oil.duhok@gmail.com"
                required
              />
            </div>
            <div>
              <label className={`block text-[10px] font-black text-brand-dark mb-2 uppercase tracking-[0.2em] opacity-80 ${isRtl ? 'text-right' : 'text-left'}`}>{t('admin.password')}</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full bg-brand-gray px-6 py-5 rounded-[1.5rem] border-2 border-transparent focus:border-brand-dark/10 focus:bg-white focus:outline-none transition-all font-bold text-brand-dark placeholder-brand-dark/20 ${isRtl ? 'text-right' : 'text-left'}`}
                placeholder="••••••••••••"
                required
              />
            </div>
            {loginError && (
              <div className="flex items-center space-x-2 bg-red-50 p-4 rounded-xl text-red-600">
                <AlertCircle className="h-4 w-4" />
                <p className="text-[10px] font-black uppercase tracking-widest">{loginError}</p>
              </div>
            )}
            <button type="submit" className="w-full bg-brand-dark text-white font-black py-6 rounded-[1.5rem] hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-[0.4em] text-[11px] shadow-2xl mt-4">
              {t('admin.unlock')}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`bg-brand-light min-h-screen pt-32 pb-24 ${isRtl ? 'rtl text-right' : 'ltr text-left'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header Section */}
        <div className={`flex flex-col md:flex-row justify-between items-center mb-16 gap-8 ${isRtl ? 'md:flex-row-reverse' : ''}`}>
          <div className={`flex items-center space-x-6 ${isRtl ? 'space-x-reverse' : ''}`}>
            <div className="w-16 h-16 bg-brand-dark rounded-[1.5rem] flex items-center justify-center shadow-3xl border border-white/10">
              <LayoutGrid className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-white uppercase tracking-tighter leading-none">
                {t('admin.controlPanel').split(' ')[0]} <span className="text-brand-dark">{t('admin.controlPanel').split(' ')[1]}</span>
              </h1>
              <div className="flex items-center mt-2">
                 {isProcessing && <Loader2 className="h-3 w-3 text-white animate-spin mr-2" />}
                 <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Elite Operational Control</p>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsAuthenticated(false)} 
            className={`flex items-center space-x-3 px-10 py-5 bg-white text-brand-dark font-black rounded-[1.5rem] hover:text-red-600 transition-all shadow-3xl uppercase tracking-widest text-[10px] ${isRtl ? 'space-x-reverse' : ''}`}
          >
            <LogOut className="h-4 w-4" />
            <span>{t('admin.logout')}</span>
          </button>
        </div>

        {/* Global Toast */}
        <AnimatePresence>
          {successMsg && (
            <motion.div initial={{ opacity: 0, y: -20, x: 20 }} animate={{ opacity: 1, y: 0, x: 0 }} exit={{ opacity: 0, y: -20, x: 20 }} className="fixed top-28 right-8 z-[100] bg-brand-dark text-white px-8 py-5 rounded-[1.5rem] shadow-3xl flex items-center space-x-4 font-black uppercase text-[10px] tracking-[0.2em] border border-white/10">
              <CheckCircle className="h-5 w-5 text-brand-main" />
              <span>{successMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Section: Fuel Management */}
          <div className="bg-white rounded-[3rem] p-10 shadow-3xl border border-brand-dark/5">
            <div className={`flex items-center justify-between mb-10 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center space-x-5 ${isRtl ? 'space-x-reverse' : ''}`}>
                <div className="p-4 bg-brand-dark/5 rounded-[1.5rem]">
                  <Fuel className="h-7 w-7 text-brand-dark" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-brand-dark uppercase tracking-widest">{t('admin.fuelRates')}</h2>
                  <p className="text-[9px] font-bold text-brand-dark/30 uppercase tracking-[0.3em] mt-1">Live Global Price Feed</p>
                </div>
              </div>
              <div className={`flex items-center space-x-3 ${isRtl ? 'space-x-reverse' : ''}`}>
                {Object.keys(editedFuelPrices).length > 0 && (
                  <button 
                    onClick={handleSaveFuels}
                    disabled={isProcessing}
                    className="flex items-center space-x-2 px-6 py-4 bg-brand-dark text-white rounded-[1.2rem] font-black text-[10px] uppercase tracking-widest hover:bg-brand-dark/90 shadow-xl disabled:opacity-50 transition-all"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </button>
                )}
                <button onClick={() => setShowAddFuel(!showAddFuel)} className="p-4 bg-brand-gray hover:bg-brand-dark/10 rounded-[1.2rem] transition-colors">
                  {showAddFuel ? <X className="h-6 w-6 text-brand-dark" /> : <PlusCircle className="h-6 w-6 text-brand-dark" />}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {showAddFuel && (
                <motion.form initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} onSubmit={handleAddFuel} className="mb-10 p-8 bg-brand-gray/50 rounded-[2rem] space-y-5 overflow-hidden border border-brand-dark/5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[9px] font-black uppercase text-brand-dark/60 mb-2 px-1">Fuel Name</label>
                      <input type="text" value={newFuelType} onChange={e => setNewFuelType(e.target.value)} placeholder="e.g. Ultra Diesel" className={`bg-white p-5 rounded-[1rem] w-full font-bold text-brand-dark border border-brand-dark/5 outline-none focus:border-brand-dark/20 ${isRtl ? 'text-right' : 'text-left'}`} required />
                    </div>
                    <div>
                      <label className="block text-[9px] font-black uppercase text-brand-dark/60 mb-2 px-1">Price (IQD/L)</label>
                      <input type="number" value={newFuelPrice} onChange={e => setNewFuelPrice(e.target.value)} placeholder="0" className={`bg-white p-5 rounded-[1rem] w-full font-bold text-brand-dark border border-brand-dark/5 outline-none focus:border-brand-dark/20 ${isRtl ? 'text-right' : 'text-left'}`} required />
                    </div>
                  </div>
                  <button type="submit" disabled={isProcessing} className="w-full bg-brand-dark text-white py-5 rounded-[1rem] font-black uppercase text-[10px] tracking-[0.3em] disabled:opacity-50 shadow-2xl">
                    {isProcessing ? <Loader2 className="animate-spin mx-auto h-4 w-4" /> : t('admin.addFuel')}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fuelPrices.map(f => (
                <div key={f.type} className={`p-6 rounded-[1.5rem] bg-brand-gray/30 group border border-transparent hover:border-brand-dark/5 transition-all flex flex-col justify-between ${isRtl ? 'text-right' : 'text-left'}`}>
                  <div className={`flex justify-between items-start mb-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <span className="font-black uppercase text-[11px] text-brand-dark tracking-tight opacity-70">{f.type}</span>
                    <button onClick={() => { if(confirm(t('admin.deleteConfirm'))) removeFuelPrice(f.type) }} className="p-2 text-red-500/20 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={editedFuelPrices[f.type] ?? f.pricePerLiter} 
                      onChange={e => setEditedFuelPrices({ ...editedFuelPrices, [f.type]: parseInt(e.target.value) })}
                      className={`bg-white px-6 py-4 rounded-[1rem] w-full font-black text-brand-dark focus:ring-4 focus:ring-brand-dark/5 outline-none transition-all text-lg ${isRtl ? 'text-left' : 'text-right'}`} 
                    />
                    <span className={`absolute top-1/2 -translate-y-1/2 text-[9px] font-black text-brand-dark/20 uppercase pointer-events-none ${isRtl ? 'left-6' : 'right-6'}`}>IQD / L</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Category Architect */}
          <div className="bg-brand-dark text-white rounded-[3rem] p-12 shadow-3xl relative overflow-hidden flex flex-col justify-center border border-white/10">
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-main/10 blur-[100px] -mr-40 -mt-40" />
            <div className={`relative z-10 flex items-center justify-between mb-10 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center space-x-6 ${isRtl ? 'space-x-reverse' : ''}`}>
                <div className="w-20 h-20 bg-white/10 rounded-[2.5rem] flex items-center justify-center border border-white/5">
                  <ShoppingBag className="h-10 w-10 text-brand-main" />
                </div>
                <div>
                  <h2 className="text-3xl font-black uppercase tracking-widest">{t('admin.addCategory')}</h2>
                  <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em] mt-2">New Operational Unit</p>
                </div>
              </div>
              <button onClick={() => setShowAddSection(!showAddSection)} className="p-5 bg-white/10 hover:bg-white/20 rounded-[2rem] transition-all">
                {showAddSection ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
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
                    placeholder={t('admin.categoryPlaceholder')} 
                    className={`bg-white/10 p-8 rounded-[2rem] w-full font-black text-white placeholder-white/20 border border-white/5 outline-none focus:border-white/30 transition-all text-xl ${isRtl ? 'text-right' : 'text-left'}`} 
                    required 
                  />
                  <button type="submit" disabled={isProcessing} className="w-full bg-white text-brand-dark py-6 rounded-[2rem] font-black uppercase text-[12px] tracking-[0.5em] shadow-3xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50">
                    {isProcessing ? <Loader2 className="animate-spin mx-auto h-5 w-5" /> : 'Construct Category'}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
            {!showAddSection && (
               <p className="text-white/20 text-[9px] font-bold uppercase tracking-[0.6em] text-center mt-6">Secure Manual Entry Node</p>
            )}
          </div>

          {/* Section: Dynamic Category Management */}
          {customSections.map(section => {
            const itemsInThisSection = section.items.map(i => i.id);
            const isDirty = itemsInThisSection.some(id => editedItemPrices[id] !== undefined);

            return (
              <div key={section.id} className="bg-white rounded-[3rem] p-10 shadow-3xl border-t-[12px] border-brand-dark">
                <div className={`flex items-center justify-between mb-10 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex items-center space-x-6 ${isRtl ? 'space-x-reverse' : ''}`}>
                    <div className="w-16 h-16 bg-brand-dark/5 rounded-[1.8rem] flex items-center justify-center">
                      <LayoutGrid className="h-7 w-7 text-brand-dark" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-brand-dark uppercase tracking-widest">{t(section.title)}</h2>
                      <p className="text-[10px] font-bold text-brand-dark/30 uppercase tracking-[0.4em] mt-2">{section.items.length} ACTIVE SERVICES</p>
                    </div>
                  </div>
                  <div className={`flex items-center space-x-3 ${isRtl ? 'space-x-reverse' : ''}`}>
                    {isDirty && (
                      <button 
                        onClick={() => handleSaveItems(section.id)}
                        disabled={isProcessing}
                        className="flex items-center space-x-2 px-8 py-4 bg-brand-dark text-white rounded-[1.2rem] font-black text-[10px] uppercase tracking-widest hover:bg-brand-dark/90 shadow-2xl transition-all"
                      >
                        <Save className="h-4 w-4" />
                        <span>Update List</span>
                      </button>
                    )}
                    <button 
                      onClick={() => setNewItemSectionId(newItemSectionId === section.id ? null : section.id)} 
                      className="p-4 bg-brand-gray hover:bg-brand-dark/10 rounded-[1.2rem] text-brand-dark transition-all"
                    >
                      {newItemSectionId === section.id ? <X className="h-6 w-6" /> : <PlusCircle className="h-6 w-6" />}
                    </button>
                    <button 
                      onClick={() => { if(confirm(t('admin.deleteConfirm'))) removeCustomSection(section.id) }} 
                      className="p-4 bg-red-50 text-red-400 hover:bg-red-500 hover:text-white rounded-[1.2rem] transition-all shadow-sm"
                    >
                      <Trash2 className="h-6 w-6" />
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {newItemSectionId === section.id && (
                    <motion.form initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} onSubmit={handleAddItemToSection} className="mb-10 p-8 bg-brand-gray/50 rounded-[2rem] space-y-5 overflow-hidden border border-brand-dark/5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-[9px] font-black uppercase text-brand-dark/60 mb-2 px-2">Item Name</label>
                          <input type="text" value={newItemName} onChange={e => setNewItemName(e.target.value)} placeholder="e.g. Full Polish" className={`bg-white p-5 rounded-[1.2rem] w-full font-bold text-brand-dark border border-brand-dark/5 outline-none focus:border-brand-dark/20 ${isRtl ? 'text-right' : 'text-left'}`} required />
                        </div>
                        <div>
                          <label className="block text-[9px] font-black uppercase text-brand-dark/60 mb-2 px-2">Price (IQD)</label>
                          <input type="number" value={newItemPrice} onChange={e => setNewItemPrice(e.target.value)} placeholder="0" className={`bg-white p-5 rounded-[1.2rem] w-full font-bold text-brand-dark border border-brand-dark/5 outline-none focus:border-brand-dark/20 ${isRtl ? 'text-right' : 'text-left'}`} required />
                        </div>
                      </div>
                      <button type="submit" disabled={isProcessing} className="w-full bg-brand-dark text-white py-5 rounded-[1.2rem] font-black uppercase text-[10px] tracking-[0.4em] shadow-xl">
                        {isProcessing ? <Loader2 className="animate-spin mx-auto h-4 w-4" /> : 'Confirm New Item'}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>

                <div className="space-y-4">
                  {section.items.map(item => (
                    <div key={item.id} className={`flex justify-between items-center p-5 rounded-[1.5rem] bg-brand-gray/20 group border border-transparent hover:border-brand-dark/5 transition-all ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <div className={`flex items-center space-x-4 ${isRtl ? 'space-x-reverse' : ''}`}>
                        <button onClick={() => { if(confirm(t('admin.deleteConfirm'))) removeItemFromCustomSection(section.id, item.id) }} className="p-3 text-red-500/20 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <span className="font-black uppercase text-[12px] text-brand-dark/60 group-hover:text-brand-dark transition-colors tracking-tight">
                          {t(item.name)}
                        </span>
                      </div>
                      <div className="relative">
                        <input 
                          type="number" 
                          value={editedItemPrices[item.id] ?? item.price} 
                          onChange={e => setEditedItemPrices({ ...editedItemPrices, [item.id]: parseInt(e.target.value) })}
                          className={`bg-white px-6 py-4 rounded-[1.2rem] w-40 font-black text-brand-dark focus:ring-4 focus:ring-brand-dark/5 outline-none transition-all text-lg ${isRtl ? 'text-left' : 'text-right'}`} 
                        />
                        <span className={`absolute top-1/2 -translate-y-1/2 text-[9px] font-black text-brand-dark/20 uppercase pointer-events-none ${isRtl ? 'left-4' : 'right-4'}`}>IQD</span>
                      </div>
                    </div>
                  ))}
                  {section.items.length === 0 && (
                    <div className="text-center py-16 border-2 border-dashed border-brand-dark/5 rounded-[2rem]">
                      <ShoppingBag className="h-10 w-10 text-brand-dark/5 mx-auto mb-4" />
                      <p className="text-brand-dark/10 text-[10px] font-black uppercase tracking-[0.6em]">{t('admin.noItems')}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Section: Master Contact Settings */}
          <div className="bg-white rounded-[3rem] p-12 shadow-3xl border border-brand-dark/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-brand-dark/5 rounded-full -mr-20 -mt-20" />
            <div className={`flex items-center space-x-6 mb-12 ${isRtl ? 'space-x-reverse' : ''}`}>
              <div className="w-16 h-16 bg-brand-dark/5 rounded-[1.8rem] flex items-center justify-center">
                <Phone className="h-7 w-7 text-brand-dark" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-brand-dark uppercase tracking-widest">{t('admin.contactPhone')}</h2>
                <p className="text-[9px] font-bold text-brand-dark/30 uppercase tracking-[0.4em] mt-2">Global Access Number</p>
              </div>
            </div>
            <div className="relative group">
              <input 
                type="text" 
                defaultValue={contactPhone} 
                onBlur={e => { updatePhone(e.target.value); notify(t('admin.settingsSaved')) }} 
                className={`w-full bg-brand-gray px-10 py-8 rounded-[2rem] border-2 border-transparent focus:border-brand-dark/10 focus:bg-white focus:outline-none transition-all font-black text-brand-dark text-3xl group-hover:shadow-3xl ${isRtl ? 'text-right' : 'text-left'}`} 
                dir="ltr" 
              />
              <div className={`absolute top-1/2 -translate-y-1/2 pointer-events-none opacity-20 ${isRtl ? 'left-10' : 'right-10'}`}>
                <CheckCircle className="h-8 w-8 text-brand-dark" />
              </div>
            </div>
            <p className="text-[10px] font-bold text-brand-dark/40 uppercase tracking-[0.5em] mt-8 text-center leading-relaxed">Changes to this field propagate across all <br /> footer and about page contact nodes instantly.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
