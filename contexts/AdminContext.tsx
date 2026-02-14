
import React, { createContext, useContext, useState, useEffect } from 'react';
import { FuelPrice, Service, CoffeeItem, FuelType } from '../types';
import { FUEL_PRICES as INITIAL_FUEL_PRICES, SERVICES as INITIAL_SERVICES, OWNER_INFO as INITIAL_OWNER_INFO } from '../constants';
import { supabase } from '../supabase';

interface AdminContextType {
  fuelPrices: FuelPrice[];
  services: Service[];
  coffeeMenu: CoffeeItem[];
  contactPhone: string;
  updateFuelPrice: (type: FuelType, newPrice: number) => Promise<void>;
  updateServicePrice: (id: string, newPrice: number) => void;
  updateCoffeePrice: (id: string, newPrice: number) => void;
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
    const base = INITIAL_SERVICES.map(s => ({ ...s, price: s.id === 'car-wash' ? 5000 : undefined }));
    return saved ? JSON.parse(saved) : base;
  });

  const [coffeeMenu, setCoffeeMenu] = useState<CoffeeItem[]>(() => {
    const saved = localStorage.getItem('mizgin_coffee_menu');
    return saved ? JSON.parse(saved) : INITIAL_COFFEE_MENU;
  });

  const [contactPhone, setContactPhone] = useState(() => {
    const saved = localStorage.getItem('mizgin_phone');
    return saved ? saved : INITIAL_OWNER_INFO.phone;
  });

  // Fetch initial fuel prices and setup real-time subscription
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
            description: item.description || INITIAL_FUEL_PRICES.find(f => f.type === item.type)?.description || ''
          }));
          setFuelPrices(mappedData);
        }
      } catch (err) {
        console.warn('Supabase initial fetch failed, using constants.', err);
      }
    };

    fetchFuelPrices();

    // Setup Real-time Subscription
    const channel = supabase
      .channel('fuel-price-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'Fuel Prices'
        },
        (payload) => {
          const updatedItem = payload.new as any;
          setFuelPrices(prev => prev.map(f => 
            f.type === updatedItem.type 
              ? { ...f, pricePerLiter: updatedItem.pricePerLiter } 
              : f
          ));
        }
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
    localStorage.setItem('mizgin_phone', contactPhone);
  }, [contactPhone]);

  const updateFuelPrice = async (type: FuelType, newPrice: number) => {
    // Optimistic local update
    const previousPrices = [...fuelPrices];
    setFuelPrices(prev => prev.map(f => f.type === type ? { ...f, pricePerLiter: newPrice } : f));

    try {
      const { error } = await supabase
        .from('Fuel Prices')
        .update({ pricePerLiter: newPrice })
        .eq('type', type);

      if (error) throw error;
    } catch (err) {
      console.error('Failed to update Supabase fuel price:', err);
      setFuelPrices(previousPrices); // Rollback
      throw err;
    }
  };

  const updateServicePrice = (id: string, newPrice: number) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, price: newPrice } : s));
  };

  const updateCoffeePrice = (id: string, newPrice: number) => {
    setCoffeeMenu(prev => prev.map(c => c.id === id ? { ...c, price: newPrice } : c));
  };

  const updatePhone = (newPhone: string) => {
    setContactPhone(newPhone);
  };

  return (
    <AdminContext.Provider value={{ 
      fuelPrices, 
      services, 
      coffeeMenu, 
      contactPhone,
      updateFuelPrice,
      updateServicePrice,
      updateCoffeePrice,
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
