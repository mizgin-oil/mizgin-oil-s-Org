
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '../contexts/AdminContext';
import { Lock, LogOut, Fuel, Phone, CheckCircle, Plus, Trash2, X, LayoutGrid, Loader2 } from 'lucide-react';

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
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Creation States
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
        notify(`Added ${newFuelType}`);
        setNewFuelType('');
        setNewFuelPrice('');
        setShowAddFuel(false);
      } catch (err) {
        console.error(err);
        alert('Failed to add fuel.');
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
        notify(`Section "${newSectionTitle}" Created`);
        setNewSectionTitle('');
        setShowAddSection(false);
      } catch (err) {
        console.error(err);
        alert('Failed to create category.');
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
        notify(`Added ${newItemName}`);
        setNewItemName('');
        setNewItemPrice('');
        setNewItemSectionId(null);
      } catch (err) {
        console.error(err);
        alert('Failed to add item to section.');
      } finally {
        setIsProcessing(false);
      }
    }
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
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-brand-main mb-2 uppercase tracking-[0.2em]">Admin Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-brand-light px-5 py-4 rounded-xl border-2 border-transparent focus:border-brand-main focus:bg-white focus:outline-none transition-all font-bold"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-brand-main mb-2 uppercase tracking-[0.2em]">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-brand-light px-5 py-4 rounded-xl border-2 border-transparent focus:border-brand-main focus:bg-white focus:outline-none transition-all font-bold"
                required
              />
            </div>
            {loginError && <p className="text-red-500 text-xs font-bold">{loginError}</p>}
            <button type="submit" className="w-full bg-brand-dark text-white font-black py-5 rounded-xl hover:bg-brand-main transition-all uppercase tracking-[0.2em] text-xs shadow-xl">
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
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center space-x-4">
            <h1 className="text-4xl font-black text-brand-dark uppercase">Control <span className="text-brand-main">Panel</span></h1>
            {isProcessing && <Loader2 className="h-5 w-5 text-brand-main animate-spin" />}
          </div>
          <button onClick={() => setIsAuthenticated(false)} className="flex items-center space-x-3 px-6 py-3 bg-white text-brand-dark font-bold rounded-2xl hover:text-red-600 transition-all border border-transparent shadow-sm">
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>

        {successMsg && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="fixed top-28 right-8 z-50 bg-brand-main text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-3 font-bold uppercase text-xs tracking-widest">
            <CheckCircle className="h-5 w-5" />
            <span>{successMsg}</span>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Fuel Rates - Always Core */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-3xl">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <Fuel className="h-6 w-6 text-brand-main" />
                <h2 className="text-xl font-black text-brand-dark uppercase">Fuel Rates</h2>
              </div>
              <button onClick={() => setShowAddFuel(!showAddFuel)} className="p-3 bg-brand-main/10 rounded-xl text-brand-main">
                {showAddFuel ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
              </button>
            </div>
            <AnimatePresence>
              {showAddFuel && (
                <motion.form initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} onSubmit={handleAddFuel} className="mb-6 space-y-4 overflow-hidden">
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" value={newFuelType} onChange={e => setNewFuelType(e.target.value)} placeholder="Fuel Name" className="bg-brand-light p-3 rounded-xl w-full font-bold" required />
                    <input type="number" value={newFuelPrice} onChange={e => setNewFuelPrice(e.target.value)} placeholder="Price IQD" className="bg-brand-light p-3 rounded-xl w-full font-bold" required />
                  </div>
                  <button type="submit" disabled={isProcessing} className="w-full bg-brand-main text-white py-3 rounded-xl font-black uppercase text-xs disabled:opacity-50">
                    {isProcessing ? 'Saving...' : 'Add Fuel'}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
            <div className="space-y-4">
              {fuelPrices.map(f => (
                <div key={f.type} className="flex justify-between items-center group">
                  <div className="flex items-center space-x-2">
                    <button onClick={() => { if(confirm(`Delete ${f.type}?`)) removeFuelPrice(f.type) }} className="p-2 text-red-300 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="h-4 w-4" /></button>
                    <span className="font-bold uppercase text-sm text-brand-gray">{f.type}</span>
                  </div>
                  <input type="number" defaultValue={f.pricePerLiter} onBlur={e => updateFuelPrice(f.type, parseInt(e.target.value))} className="bg-brand-light p-2 rounded-lg w-24 text-right font-black" />
                </div>
              ))}
            </div>
          </div>

          {/* Add New Custom Category */}
          <div className="bg-brand-main text-white rounded-[2.5rem] p-8 shadow-3xl">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <LayoutGrid className="h-6 w-6" />
                <h2 className="text-xl font-black uppercase">Add New Category</h2>
              </div>
              <button onClick={() => setShowAddSection(!showAddSection)} className="p-3 bg-white/20 rounded-xl">
                {showAddSection ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
              </button>
            </div>
            <AnimatePresence>
              {showAddSection && (
                <motion.form initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} onSubmit={handleAddSection} className="space-y-4 overflow-hidden">
                  <input type="text" value={newSectionTitle} onChange={e => setNewSectionTitle(e.target.value)} placeholder="e.g. Car Wash, Market, Café" className="bg-white/10 p-4 rounded-xl w-full font-black text-white placeholder-white/50 border border-white/20 outline-none" required />
                  <button type="submit" disabled={isProcessing} className="w-full bg-white text-brand-main py-4 rounded-xl font-black uppercase text-xs shadow-lg disabled:opacity-50">
                    {isProcessing ? 'Creating...' : 'Create Category'}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
            <p className="mt-4 text-[10px] uppercase font-black opacity-60 tracking-widest leading-relaxed">Create manual categories for services, markets, or cafes here.</p>
          </div>

          {/* Custom Sections Management */}
          {customSections.map(section => (
            <div key={section.id} className="bg-white rounded-[2.5rem] p-8 shadow-3xl border-t-4 border-brand-main">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <LayoutGrid className="h-6 w-6 text-brand-main" />
                  <h2 className="text-xl font-black text-brand-dark uppercase">{section.title}</h2>
                </div>
                <div className="flex space-x-2">
                  <button onClick={() => setNewItemSectionId(newItemSectionId === section.id ? null : section.id)} className="p-3 bg-brand-main/10 rounded-xl text-brand-main">
                    {newItemSectionId === section.id ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                  </button>
                  <button onClick={() => { if(confirm(`Delete category "${section.title}"?`)) removeCustomSection(section.id) }} className="p-3 bg-red-50 rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-colors">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {newItemSectionId === section.id && (
                  <motion.form initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} onSubmit={handleAddItemToSection} className="mb-6 space-y-4 overflow-hidden">
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" value={newItemName} onChange={e => setNewItemName(e.target.value)} placeholder="Item Name" className="bg-brand-light p-3 rounded-xl w-full font-bold" required />
                      <input type="number" value={newItemPrice} onChange={e => setNewItemPrice(e.target.value)} placeholder="Price IQD" className="bg-brand-light p-3 rounded-xl w-full font-bold" required />
                    </div>
                    <button type="submit" disabled={isProcessing} className="w-full bg-brand-main text-white py-3 rounded-xl font-black uppercase text-xs disabled:opacity-50">
                      {isProcessing ? 'Adding...' : 'Add Item'}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

              <div className="space-y-4">
                {section.items.map(item => (
                  <div key={item.id} className="flex justify-between items-center group">
                    <div className="flex items-center space-x-2">
                      <button onClick={() => removeItemFromCustomSection(section.id, item.id)} className="p-2 text-red-300 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="h-4 w-4" /></button>
                      <span className="font-bold uppercase text-sm text-brand-gray">{item.name}</span>
                    </div>
                    <input type="number" defaultValue={item.price} onBlur={e => updateItemInCustomSectionPrice(section.id, item.id, parseInt(e.target.value))} className="bg-brand-light p-2 rounded-lg w-24 text-right font-black" />
                  </div>
                ))}
                {section.items.length === 0 && <p className="text-brand-gray/30 text-[10px] font-black uppercase tracking-widest text-center py-4">No items added yet</p>}
              </div>
            </div>
          ))}

          {/* Contact Update */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-3xl">
            <h2 className="text-xl font-black text-brand-dark uppercase mb-6 flex items-center"><Phone className="h-6 w-6 text-brand-main mr-3" /> Contact Phone</h2>
            <input type="text" defaultValue={contactPhone} onBlur={e => { updatePhone(e.target.value); notify('Phone Updated') }} className="bg-brand-light p-4 rounded-xl w-full font-black text-brand-dark text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
