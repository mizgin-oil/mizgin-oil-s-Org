
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { FuelPrice, Service, CoffeeItem, CustomSection, CustomItem } from '../types';
import { FUEL_PRICES as INITIAL_FUEL_PRICES, SERVICES as INITIAL_SERVICES, OWNER_INFO as INITIAL_OWNER_INFO } from '../constants';
import { supabase } from '../supabase';
import { GoogleGenAI, Type } from "@google/genai";

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
  refreshData: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fuelPrices, setFuelPrices] = useState<FuelPrice[]>(INITIAL_FUEL_PRICES);
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [coffeeMenu, setCoffeeMenu] = useState<CoffeeItem[]>([]);
  const [customSections, setCustomSections] = useState<CustomSection[]>([]);
  const [contactPhone, setContactPhone] = useState(INITIAL_OWNER_INFO.phone);

  const fetchAllData = useCallback(async () => {
    try {
      // 1. Fetch Fuels
      const { data: fuelData, error: fErr } = await supabase.from('Fuel Prices').select('*');
      if (!fErr && fuelData) {
        const mergedFuels = [...INITIAL_FUEL_PRICES].map(f => ({...f}));
        fuelData.forEach(dbFuel => {
          const index = mergedFuels.findIndex(m => m.type.trim().toLowerCase() === dbFuel.type.trim().toLowerCase());
          const price = Number(dbFuel.pricePerLiter);
          if (index !== -1) {
            mergedFuels[index].pricePerLiter = price;
          } else {
            mergedFuels.push({
              type: dbFuel.type,
              pricePerLiter: price,
              description: dbFuel.description || 'Premium grade fuel.'
            });
          }
        });
        setFuelPrices(mergedFuels);
      } else if (fErr) {
        console.error('Fuel fetch error:', fErr);
      }

      // 2. Fetch Legacy Services
      const { data: serviceData } = await supabase.from('services').select('*').order('name');
      if (serviceData) setServices(serviceData.map(s => ({ ...s, price: s.price ? Number(s.price) : undefined })));

      // 3. Fetch Custom Sections & Items
      const { data: sectionData } = await supabase.from('custom_sections').select('*');
      const { data: itemData } = await supabase.from('custom_items').select('*');
      
      if (sectionData) {
        setCustomSections(sectionData.map(s => ({
          id: s.id,
          title: s.title,
          items: itemData 
            ? itemData
                .filter(i => i.section_id === s.id)
                .map(i => ({ ...i, price: Number(i.price) }))
                .sort((a, b) => a.name.localeCompare(b.name))
            : []
        })));
      }

      // 4. Fetch Global Settings
      const { data: settingsData } = await supabase.from('settings').select('*').eq('key', 'contact_phone').single();
      if (settingsData) setContactPhone(settingsData.value);
      
    } catch (err) {
      console.error('AdminContext fetch error:', err);
    }
  }, []);

  const getAiTranslations = async (text: string) => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Translate the term "${text}" for a Gas Station & Services business into English, Badini (Kurdish), Sorani (Kurdish), Arabic, and Turkish. Output ONLY a JSON object with keys: en, ku-ba, ku-so, ar, tr.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              en: { type: Type.STRING },
              'ku-ba': { type: Type.STRING },
              'ku-so': { type: Type.STRING },
              ar: { type: Type.STRING },
              tr: { type: Type.STRING },
            },
            required: ['en', 'ku-ba', 'ku-so', 'ar', 'tr']
          }
        }
      });
      return response.text;
    } catch (error) {
      console.error("Translation Engine Error:", error);
      return JSON.stringify({ en: text, 'ku-ba': text, 'ku-so': text, ar: text, tr: text });
    }
  };

  useEffect(() => {
    fetchAllData();
    
    // Setup Realtime subscriptions
    const channels = [
      supabase.channel('fuels').on('postgres_changes', { event: '*', schema: 'public', table: 'Fuel Prices' }, fetchAllData).subscribe(),
      supabase.channel('sections').on('postgres_changes', { event: '*', schema: 'public', table: 'custom_sections' }, fetchAllData).subscribe(),
      supabase.channel('items').on('postgres_changes', { event: '*', schema: 'public', table: 'custom_items' }, fetchAllData).subscribe(),
      supabase.channel('settings').on('postgres_changes', { event: '*', schema: 'public', table: 'settings' }, fetchAllData).subscribe()
    ];

    return () => {
      channels.forEach(c => supabase.removeChannel(c));
    };
  }, [fetchAllData]);

  const updateFuelPrice = async (type: string, newPrice: number) => {
    const { error } = await supabase.from('Fuel Prices').upsert({ type, pricePerLiter: newPrice });
    if (error) throw error;
    await fetchAllData();
  };

  const addFuelPrice = async (type: string, price: number, description: string) => {
    const { error } = await supabase.from('Fuel Prices').insert([{ type, pricePerLiter: price, description }]);
    if (error) throw error;
    await fetchAllData();
  };

  const removeFuelPrice = async (type: string) => {
    const { error } = await supabase.from('Fuel Prices').delete().eq('type', type);
    if (error) throw error;
    await fetchAllData();
  };

  const updateServicePrice = async (id: string, newPrice: number) => {
    const { error } = await supabase.from('services').update({ price: newPrice }).eq('id', id);
    if (error) throw error;
    await fetchAllData();
  };

  const addService = async (name: string, price: number, description: string) => {
    const translations = await getAiTranslations(name);
    const { error } = await supabase.from('services').insert([{ 
      id: 'svc-' + Date.now(), 
      name: translations, 
      price, 
      description, 
      icon: 'Tool',
      image: 'https://images.unsplash.com/photo-1486006396193-471068589dca?auto=format&fit=crop&q=80&w=1200'
    }]);
    if (error) throw error;
    await fetchAllData();
  };

  const removeService = async (id: string) => {
    const { error } = await supabase.from('services').delete().eq('id', id);
    if (error) throw error;
    await fetchAllData();
  };

  const updateCoffeePrice = async (id: string, newPrice: number) => {
    const { error } = await supabase.from('coffee_menu').update({ price: newPrice }).eq('id', id);
    if (error) throw error;
    await fetchAllData();
  };

  const addCoffeeItem = async (name: string, price: number) => {
    const translations = await getAiTranslations(name);
    const { error } = await supabase.from('coffee_menu').insert([{ id: 'cof-' + Date.now(), name: translations, price }]);
    if (error) throw error;
    await fetchAllData();
  };

  const removeCoffeeItem = async (id: string) => {
    const { error } = await supabase.from('coffee_menu').delete().eq('id', id);
    if (error) throw error;
    await fetchAllData();
  };

  const addCustomSection = async (title: string) => {
    const translations = await getAiTranslations(title);
    const { error } = await supabase.from('custom_sections').insert([{ id: 'sec-' + Date.now(), title: translations }]);
    if (error) throw error;
    await fetchAllData();
  };

  const removeCustomSection = async (id: string) => {
    const { error } = await supabase.from('custom_sections').delete().eq('id', id);
    if (error) throw error;
    await fetchAllData();
  };

  const addItemToCustomSection = async (sectionId: string, name: string, price: number) => {
    const translations = await getAiTranslations(name);
    const { error } = await supabase.from('custom_items').insert([{ id: 'itm-' + Date.now(), section_id: sectionId, name: translations, price }]);
    if (error) throw error;
    await fetchAllData();
  };

  const removeItemFromCustomSection = async (sectionId: string, itemId: string) => {
    const { error } = await supabase.from('custom_items').delete().eq('id', itemId);
    if (error) throw error;
    await fetchAllData();
  };

  const updateItemInCustomSectionPrice = async (sectionId: string, itemId: string, newPrice: number) => {
    const { error } = await supabase.from('custom_items').update({ price: newPrice }).eq('id', itemId);
    if (error) throw error;
    await fetchAllData();
  };

  const updatePhone = async (newPhone: string) => {
    const { error } = await supabase.from('settings').upsert({ key: 'contact_phone', value: newPhone });
    if (error) throw error;
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
      removeItemFromCustomSection, updateItemInCustomSectionPrice, updatePhone,
      refreshData: fetchAllData
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
