
import React, { createContext, useContext, useState, useEffect } from 'react';
import { FuelPrice, Service, CoffeeItem, FuelType, CustomSection, CustomItem } from '../types';
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
  updateServicePrice: (id: string, newPrice: number) => void;
  addService: (name: string, price: number, description: string) => void;
  removeService: (id: string) => void;
  updateCoffeePrice: (id: string, newPrice: number) => void;
  addCoffeeItem: (name: string, price: number) => void;
  removeCoffeeItem: (id: string) => void;
  addCustomSection: (title: string) => void;
  removeCustomSection: (id: string) => void;
  addItemToCustomSection: (sectionId: string, name: string, price: number) => void;
  removeItemFromCustomSection: (sectionId: string, itemId: string) => void;
  updateItemInCustomSectionPrice: (sectionId: string, itemId: string, newPrice: number) => void;
  updatePhone: (newPhone: string) => void;
}

const INITIAL_COFFEE_MENU: CoffeeItem[] = [
  { id: 'espresso', name: 'Espresso', price: 1500 },
  { id: 'latte', name: 'Caffè Latte', price: 3000 },
  { id: 'cappuccino', name: 'Cappuccino', price: 3000 },
  { id: 'americano', name: 'Americano', price: 2500 },
];

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fuelPrices, setFuelPrices] = useState<FuelPrice[]>(INITIAL_FUEL_PRICES);

  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem('mizgin_services');
    if (saved) return JSON.parse(saved);
    return INITIAL_SERVICES.map(s => ({ 
      ...s, 
      price: s.id === 'car-wash' ? 5000 : 0 
    }));
  });

  const [coffeeMenu, setCoffeeMenu] = useState<CoffeeItem[]>(() => {
    const saved = localStorage.getItem('mizgin_coffee_menu');
    return saved ? JSON.parse(saved) : INITIAL_COFFEE_MENU;
  });

  const [customSections, setCustomSections] = useState<CustomSection[]>(() => {
    const saved = localStorage.getItem('mizgin_custom_sections');
    return saved ? JSON.parse(saved) : [];
  });

  const [contactPhone, setContactPhone] = useState(() => {
    const saved = localStorage.getItem('mizgin_phone');
    return saved ? saved : INITIAL_OWNER_INFO.phone;
  });

  useEffect(() => {
    const fetchFuelPrices = async () => {
      try {
        const { data, error } = await supabase
          .from('Fuel Prices')
          .select('*');

        if (error) throw error;

        if (data && data.length > 0) {
          const mappedData: FuelPrice[] = data.map((item: any) => ({
            type: item.type as FuelType,
            pricePerLiter: item.pricePerLiter,
            description: INITIAL_FUEL_PRICES.find(f => f.type === item.type)?.description || 'Premium grade fuel.'
          }));
          setFuelPrices(mappedData);
        }
      } catch (err) {
        console.warn('Supabase initial fetch failed, using constants.', err);
      }
    };

    fetchFuelPrices();

    const channel = supabase
      .channel('fuel-price-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'Fuel Prices' },
        () => fetchFuelPrices()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('mizgin_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('mizgin_coffee_menu', JSON.stringify(coffeeMenu));
  }, [coffeeMenu]);

  useEffect(() => {
    localStorage.setItem('mizgin_custom_sections', JSON.stringify(customSections));
  }, [customSections]);

  useEffect(() => {
    localStorage.setItem('mizgin_phone', contactPhone);
  }, [contactPhone]);

  const updateFuelPrice = async (type: string, newPrice: number) => {
    try {
      const { error } = await supabase
        .from('Fuel Prices')
        .update({ pricePerLiter: newPrice })
        .eq('type', type);
      if (error) throw error;
    } catch (err) {
      console.error('Failed to update fuel price:', err);
      throw err;
    }
  };

  const addFuelPrice = async (type: string, price: number, description: string) => {
    try {
      const { error } = await supabase
        .from('Fuel Prices')
        .insert([{ type, pricePerLiter: price }]);
      if (error) throw error;
      setFuelPrices(prev => [...prev, { type: type as FuelType, pricePerLiter: price, description }]);
    } catch (err) {
      console.error('Failed to add fuel price:', err);
      throw err;
    }
  };

  const removeFuelPrice = async (type: string) => {
    try {
      const { error } = await supabase
        .from('Fuel Prices')
        .delete()
        .eq('type', type);
      if (error) throw error;
      setFuelPrices(prev => prev.filter(f => f.type !== type));
    } catch (err) {
      console.error('Failed to remove fuel price:', err);
      throw err;
    }
  };

  const updateServicePrice = (id: string, newPrice: number) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, price: newPrice } : s));
  };

  const addService = (name: string, price: number, description: string) => {
    const newService: Service = {
      id: 'service-' + Date.now(),
      name,
      description,
      icon: 'Tool',
      image: 'https://images.unsplash.com/photo-1486006396193-471068589dca?auto=format&fit=crop&q=80&w=1200',
      price
    };
    setServices(prev => [...prev, newService]);
  };

  const removeService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  const updateCoffeePrice = (id: string, newPrice: number) => {
    setCoffeeMenu(prev => prev.map(c => c.id === id ? { ...c, price: newPrice } : c));
  };

  const addCoffeeItem = (name: string, price: number) => {
    const newItem: CoffeeItem = {
      id: 'coffee-' + Date.now(),
      name,
      price
    };
    setCoffeeMenu(prev => [...prev, newItem]);
  };

  const removeCoffeeItem = (id: string) => {
    setCoffeeMenu(prev => prev.filter(c => c.id !== id));
  };

  const addCustomSection = (title: string) => {
    const newSection: CustomSection = {
      id: 'section-' + Date.now(),
      title,
      items: []
    };
    setCustomSections(prev => [...prev, newSection]);
  };

  const removeCustomSection = (id: string) => {
    setCustomSections(prev => prev.filter(s => s.id !== id));
  };

  const addItemToCustomSection = (sectionId: string, name: string, price: number) => {
    setCustomSections(prev => prev.map(s => {
      if (s.id === sectionId) {
        return {
          ...s,
          items: [...s.items, { id: 'item-' + Date.now(), name, price }]
        };
      }
      return s;
    }));
  };

  const removeItemFromCustomSection = (sectionId: string, itemId: string) => {
    setCustomSections(prev => prev.map(s => {
      if (s.id === sectionId) {
        return {
          ...s,
          items: s.items.filter(i => i.id !== itemId)
        };
      }
      return s;
    }));
  };

  const updateItemInCustomSectionPrice = (sectionId: string, itemId: string, newPrice: number) => {
    setCustomSections(prev => prev.map(s => {
      if (s.id === sectionId) {
        return {
          ...s,
          items: s.items.map(i => i.id === itemId ? { ...i, price: newPrice } : i)
        };
      }
      return s;
    }));
  };

  const updatePhone = (newPhone: string) => {
    setContactPhone(newPhone);
  };

  return (
    <AdminContext.Provider value={{ 
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
