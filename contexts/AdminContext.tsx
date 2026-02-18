
import React, { createContext, useContext, useState, useEffect } from 'react';
import { FuelPrice, Service, CoffeeItem, CustomSection, CustomItem } from '../types';
import { FUEL_PRICES as INITIAL_FUEL_PRICES, SERVICES as INITIAL_SERVICES, OWNER_INFO as INITIAL_OWNER_INFO } from '../constants';
import { supabase } from '../supabase';

interface AdminContextType {
  fuelPrices: FuelPrice[];
  services: Service[];
  coffeeMenu: CoffeeItem[];
  customSections: CustomSection[];
  contactPhone: string;
  updateFuelPrice: (type: string, newPrice: number) => Promise<void>;
  addFuelPrice: (type: string, price: number, description: string) => Promise<void>;
  removeFuelPrice: (type: string) => Promise<void>;
  updateServicePrice: (id: string, newPrice: number) => Promise<void>;
  addService: (name: string, price: number, description: string) => Promise<void>;
  removeService: (id: string) => Promise<void>;
  updateCoffeePrice: (id: string, newPrice: number) => Promise<void>;
  addCoffeeItem: (name: string, price: number) => Promise<void>;
  removeCoffeeItem: (id: string) => Promise<void>;
  addCustomSection: (title: string) => Promise<void>;
  removeCustomSection: (id: string) => Promise<void>;
  addItemToCustomSection: (sectionId: string, name: string, price: number) => Promise<void>;
  removeItemFromCustomSection: (sectionId: string, itemId: string) => Promise<void>;
  updateItemInCustomSectionPrice: (sectionId: string, itemId: string, newPrice: number) => Promise<void>;
  updatePhone: (newPhone: string) => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fuelPrices, setFuelPrices] = useState<FuelPrice[]>(INITIAL_FUEL_PRICES);
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [coffeeMenu, setCoffeeMenu] = useState<CoffeeItem[]>([]);
  const [customSections, setCustomSections] = useState<CustomSection[]>([]);
  const [contactPhone, setContactPhone] = useState(INITIAL_OWNER_INFO.phone);

  const fetchAllData = async () => {
    try {
      // 1. Fuel Prices
      const { data: fuelData } = await supabase.from('Fuel Prices').select('*');
      if (fuelData && fuelData.length > 0) {
        setFuelPrices(fuelData.map(f => ({
          type: f.type,
          pricePerLiter: f.pricePerLiter,
          description: f.description || 'Premium grade fuel.'
        })));
      }

      // 2. Services
      const { data: serviceData } = await supabase.from('services').select('*').order('name');
      if (serviceData) {
        // If the DB has services (even an empty array), we use those. 
        // We only use INITIAL_SERVICES if the DB call fails or hasn't run.
        setServices(serviceData);
      }

      // 3. Coffee Menu
      const { data: coffeeData } = await supabase.from('coffee_menu').select('*').order('name');
      if (coffeeData) setCoffeeMenu(coffeeData);

      // 4. Custom Sections
      const { data: sectionData } = await supabase.from('custom_sections').select('*');
      const { data: itemData } = await supabase.from('custom_items').select('*');
      
      if (sectionData) {
        setCustomSections(sectionData.map(s => ({
          id: s.id,
          title: s.title,
          items: itemData ? itemData.filter(i => i.section_id === s.id) : []
        })));
      }

      // 5. Settings
      const { data: settingsData } = await supabase.from('settings').select('*').eq('key', 'contact_phone').single();
      if (settingsData) setContactPhone(settingsData.value);

    } catch (err) {
      console.warn('Supabase fetch issue:', err);
    }
  };

  useEffect(() => {
    fetchAllData();
    const fuelChannel = supabase.channel('f_rt').on('postgres_changes', { event: '*', schema: 'public', table: 'Fuel Prices' }, fetchAllData).subscribe();
    const svcChannel = supabase.channel('s_rt').on('postgres_changes', { event: '*', schema: 'public', table: 'services' }, fetchAllData).subscribe();
    const cofChannel = supabase.channel('c_rt').on('postgres_changes', { event: '*', schema: 'public', table: 'coffee_menu' }, fetchAllData).subscribe();
    const secChannel = supabase.channel('x_rt').on('postgres_changes', { event: '*', schema: 'public', table: 'custom_sections' }, fetchAllData).on('postgres_changes', { event: '*', schema: 'public', table: 'custom_items' }, fetchAllData).subscribe();

    return () => {
      supabase.removeChannel(fuelChannel);
      supabase.removeChannel(svcChannel);
      supabase.removeChannel(cofChannel);
      supabase.removeChannel(secChannel);
    };
  }, []);

  const updateFuelPrice = async (type: string, newPrice: number) => {
    await supabase.from('Fuel Prices').upsert({ type, pricePerLiter: newPrice });
    await fetchAllData();
  };

  const addFuelPrice = async (type: string, price: number, description: string) => {
    await supabase.from('Fuel Prices').insert([{ type, pricePerLiter: price, description }]);
    await fetchAllData();
  };

  const removeFuelPrice = async (type: string) => {
    await supabase.from('Fuel Prices').delete().eq('type', type);
    await fetchAllData();
  };

  const updateServicePrice = async (id: string, newPrice: number) => {
    await supabase.from('services').update({ price: newPrice }).eq('id', id);
    await fetchAllData();
  };

  const addService = async (name: string, price: number, description: string) => {
    const { error } = await supabase.from('services').insert([{ 
      id: 'svc-' + Date.now(), 
      name, 
      price, 
      description, 
      icon: 'Tool',
      image: 'https://images.unsplash.com/photo-1486006396193-471068589dca?auto=format&fit=crop&q=80&w=1200'
    }]);
    if (error) throw error;
    await fetchAllData();
  };

  const removeService = async (id: string) => {
    await supabase.from('services').delete().eq('id', id);
    await fetchAllData();
  };

  const updateCoffeePrice = async (id: string, newPrice: number) => {
    await supabase.from('coffee_menu').update({ price: newPrice }).eq('id', id);
    await fetchAllData();
  };

  const addCoffeeItem = async (name: string, price: number) => {
    await supabase.from('coffee_menu').insert([{ id: 'cof-' + Date.now(), name, price }]);
    await fetchAllData();
  };

  const removeCoffeeItem = async (id: string) => {
    await supabase.from('coffee_menu').delete().eq('id', id);
    await fetchAllData();
  };

  const addCustomSection = async (title: string) => {
    await supabase.from('custom_sections').insert([{ id: 'sec-' + Date.now(), title }]);
    await fetchAllData();
  };

  const removeCustomSection = async (id: string) => {
    await supabase.from('custom_sections').delete().eq('id', id);
    await fetchAllData();
  };

  const addItemToCustomSection = async (sectionId: string, name: string, price: number) => {
    await supabase.from('custom_items').insert([{ id: 'itm-' + Date.now(), section_id: sectionId, name, price }]);
    await fetchAllData();
  };

  const removeItemFromCustomSection = async (sectionId: string, itemId: string) => {
    await supabase.from('custom_items').delete().eq('id', itemId);
    await fetchAllData();
  };

  const updateItemInCustomSectionPrice = async (sectionId: string, itemId: string, newPrice: number) => {
    await supabase.from('custom_items').update({ price: newPrice }).eq('id', itemId);
    await fetchAllData();
  };

  const updatePhone = async (newPhone: string) => {
    await supabase.from('settings').upsert({ key: 'contact_phone', value: newPhone });
    setContactPhone(newPhone);
    await fetchAllData();
  };

  return (
    <AdminContext.Provider value={{ 
      fuelPrices, services, coffeeMenu, customSections, contactPhone,
      updateFuelPrice, addFuelPrice, removeFuelPrice,
      updateServicePrice, addService, removeService,
      updateCoffeePrice, addCoffeeItem, removeCoffeeItem,
      addCustomSection, removeCustomSection, addItemToCustomSection,
      removeItemFromCustomSection, updateItemInCustomSectionPrice, updatePhone
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within AdminProvider');
  return context;
};
