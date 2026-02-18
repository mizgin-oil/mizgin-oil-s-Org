
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '../contexts/AdminContext';
import { Lock, LogOut, Save, Fuel, Coffee, Droplets, Phone, CheckCircle, AlertCircle, Plus, Trash2, X, LayoutGrid } from 'lucide-react';

const AdminPage: React.FC = () => {
  const { 
    fuelPrices, 
    services, 
    coffeeMenu,
    customSections,
    contactPhone, 
    updateFuelPrice, 
    addFuelPrice,
    removeFuelPrice,
    updateServicePrice, 
    addService,
    removeService,
    updateCoffeePrice, 
    addCoffeeItem,
    removeCoffeeItem,
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
  
  // Creation States
  const [showAddFuel, setShowAddFuel] = useState(false);
  const [newFuelType, setNewFuelType] = useState('');
  const [newFuelPrice, setNewFuelPrice] = useState('');

  const [showAddService, setShowAddService] = useState(false);
  const [newServiceName, setNewServiceName] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('');

  const [showAddCoffee, setShowAddCoffee] = useState(false);
  const [newCoffeeName, setNewCoffeeName] = useState('');
  const [newCoffeePrice, setNewCoffeePrice] = useState('');

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
      await addFuelPrice(newFuelType, parseInt(newFuelPrice), 'Custom fuel grade.');
      notify(`Added ${newFuelType}`);
      setNewFuelType('');
      setNewFuelPrice('');
      setShowAddFuel(false);
    }
  };

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (newServiceName && newServicePrice) {
      addService(newServiceName, parseInt(newServicePrice), 'Premium service offered at Mizgin Oil.');
      notify(`Added ${newServiceName}`);
      setNewServiceName('');
      setNewServicePrice('');
      setShowAddService(false);
    }
  };

  const handleAddCoffee = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCoffeeName && newCoffeePrice) {
      addCoffeeItem(newCoffeeName, parseInt(newCoffeePrice));
      notify(`Added ${newCoffeeName}`);
      setNewCoffeeName('');
      setNewCoffeePrice('');
      setShowAddCoffee(false);
    }
  };

  const handleAddSection = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSectionTitle) {
      addCustomSection(newSectionTitle);
      notify(`Section "${newSectionTitle}" Created`);
      setNewSectionTitle('');
      setShowAddSection(false);
    }
  };

  const handleAddItemToSection = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemSectionId && newItemName && newItemPrice) {
      addItemToCustomSection(newItemSectionId, newItemName, parseInt(newItemPrice));
      notify(`Added ${newItemName}`);
      setNewItemName('');
      setNewItemPrice('');
      setNewItemSectionId(null);
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
          <h1 className="text-4xl font-black text-brand-dark uppercase">Control <span className="text-brand-main">Panel</span></h1>
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
          {/* Fuel Rates */}
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
                  <button type="submit" className="w-full bg-brand-main text-white py-3 rounded-xl font-black uppercase text-xs">Add Fuel</button>
                </motion.form>
              )}
            </AnimatePresence>
            <div className="space-y-4">
              {fuelPrices.map(f => (
                <div key={f.type} className="flex justify-between items-center group">
                  <div className="flex items-center space-x-2">
                    <button onClick={() => removeFuelPrice(f.type)} className="p-2 text-red-300 opacity-0 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
                    <span className="font-bold uppercase text-sm text-brand-gray">{f.type}</span>
                  </div>
                  <input type="number" defaultValue={f.pricePerLiter} onBlur={e => updateFuelPrice(f.type, parseInt(e.target.value))} className="bg-brand-light p-2 rounded-lg w-24 text-right font-black" />
                </div>
              ))}
            </div>
          </div>

          {/* Service Rates */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-3xl">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <Droplets className="h-6 w-6 text-brand-main" />
                <h2 className="text-xl font-black text-brand-dark uppercase">Service Rates</h2>
              </div>
              <button onClick={() => setShowAddService(!showAddService)} className="p-3 bg-brand-main/10 rounded-xl text-brand-main">
                {showAddService ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
              </button>
            </div>
            <AnimatePresence>
              {showAddService && (
                <motion.form initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} onSubmit={handleAddService} className="mb-6 space-y-4 overflow-hidden">
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" value={newServiceName} onChange={e => setNewServiceName(e.target.value)} placeholder="Service Name" className="bg-brand-light p-3 rounded-xl w-full font-bold" required />
                    <input type="number" value={newServicePrice} onChange={e => setNewServicePrice(e.target.value)} placeholder="Price IQD" className="bg-brand-light p-3 rounded-xl w-full font-bold" required />
                  </div>
                  <button type="submit" className="w-full bg-brand-main text-white py-3 rounded-xl font-black uppercase text-xs">Add Service</button>
                </motion.form>
              )}
            </AnimatePresence>
            <div className="space-y-4">
              {services.map(s => (
                <div key={s.id} className="flex justify-between items-center group">
                  <div className="flex items-center space-x-2">
                    <button onClick={() => removeService(s.id)} className="p-2 text-red-300 opacity-0 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
                    <span className="font-bold uppercase text-sm text-brand-gray">{s.name}</span>
                  </div>
                  <input type="number" defaultValue={s.price || 0} onBlur={e => updateServicePrice(s.id, parseInt(e.target.value))} className="bg-brand-light p-2 rounded-lg w-24 text-right font-black" />
                </div>
              ))}
            </div>
          </div>

          {/* Coffee Menu */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-3xl">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <Coffee className="h-6 w-6 text-brand-main" />
                <h2 className="text-xl font-black text-brand-dark uppercase">Coffee Menu</h2>
              </div>
              <button onClick={() => setShowAddCoffee(!showAddCoffee)} className="p-3 bg-brand-main/10 rounded-xl text-brand-main">
                {showAddCoffee ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
              </button>
            </div>
            <AnimatePresence>
              {showAddCoffee && (
                <motion.form initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} onSubmit={handleAddCoffee} className="mb-6 space-y-4 overflow-hidden">
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" value={newCoffeeName} onChange={e => setNewCoffeeName(e.target.value)} placeholder="Drink Name" className="bg-brand-light p-3 rounded-xl w-full font-bold" required />
                    <input type="number" value={newCoffeePrice} onChange={e => setNewCoffeePrice(e.target.value)} placeholder="Price IQD" className="bg-brand-light p-3 rounded-xl w-full font-bold" required />
                  </div>
                  <button type="submit" className="w-full bg-brand-main text-white py-3 rounded-xl font-black uppercase text-xs">Add Drink</button>
                </motion.form>
              )}
            </AnimatePresence>
            <div className="space-y-4">
              {coffeeMenu.map(c => (
                <div key={c.id} className="flex justify-between items-center group">
                  <div className="flex items-center space-x-2">
                    <button onClick={() => removeCoffeeItem(c.id)} className="p-2 text-red-300 opacity-0 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
                    <span className="font-bold uppercase text-sm text-brand-gray">{c.name}</span>
                  </div>
                  <input type="number" defaultValue={c.price} onBlur={e => updateCoffeePrice(c.id, parseInt(e.target.value))} className="bg-brand-light p-2 rounded-lg w-24 text-right font-black" />
                </div>
              ))}
            </div>
          </div>

          {/* Create New Custom Section */}
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
                  <input type="text" value={newSectionTitle} onChange={e => setNewSectionTitle(e.target.value)} placeholder="e.g. Lube Center" className="bg-white/10 p-4 rounded-xl w-full font-black text-white placeholder-white/50 border border-white/20 outline-none" required />
                  <button type="submit" className="w-full bg-white text-brand-main py-4 rounded-xl font-black uppercase text-xs shadow-lg">Create Category</button>
                </motion.form>
              )}
            </AnimatePresence>
            {!showAddSection && (
              <p className="text-white/60 text-xs font-bold uppercase tracking-widest text-center mt-4">Create sections like Market, Mart, or Auto Parts</p>
            )}
          </div>

          {/* Render Custom Sections Management */}
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
                  <button onClick={() => { if(confirm('Delete section?')) removeCustomSection(section.id) }} className="p-3 bg-red-50 rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-colors">
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
                    <button type="submit" className="w-full bg-brand-main text-white py-3 rounded-xl font-black uppercase text-xs">Add Item</button>
                  </motion.form>
                )}
              </AnimatePresence>

              <div className="space-y-4">
                {section.items.length === 0 && <p className="text-center text-brand-gray/30 text-[10px] uppercase font-bold py-4">No items added yet</p>}
                {section.items.map(item => (
                  <div key={item.id} className="flex justify-between items-center group">
                    <div className="flex items-center space-x-2">
                      <button onClick={() => removeItemFromCustomSection(section.id, item.id)} className="p-2 text-red-300 opacity-0 group-hover:opacity-100"><Trash2 className="h-4 w-4" /></button>
                      <span className="font-bold uppercase text-sm text-brand-gray">{item.name}</span>
                    </div>
                    <input type="number" defaultValue={item.price} onBlur={e => updateItemInCustomSectionPrice(section.id, item.id, parseInt(e.target.value))} className="bg-brand-light p-2 rounded-lg w-24 text-right font-black" />
                  </div>
                ))}
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
