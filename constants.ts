import { FuelType, FuelPrice, Service } from './types';

export const FUEL_PRICES: FuelPrice[] = [
  {
    type: FuelType.NORMAL,
    pricePerLiter: 770,
    description: 'Standard performance fuel for everyday commuting and reliability.'
  },
  {
    type: FuelType.ENHANCED,
    pricePerLiter: 1000,
    description: 'Optimized combustion for better mileage and engine cleanliness.'
  },
  {
    type: FuelType.SUPER,
    pricePerLiter: 1250,
    description: 'High-octane premium blend for maximum power and engine protection.'
  }
];

export const SERVICES: Service[] = [
  {
    id: 'car-wash',
    name: 'Elite Wash',
    description: 'Comprehensive high-pressure cleaning and detailing for all vehicle types.',
    icon: 'Droplets',
    image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'coffee-shop',
    name: 'Mizgin Café',
    description: 'Premium coffee blends and snacks while you wait for your vehicle.',
    icon: 'Coffee',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'market',
    name: 'Express Mart',
    description: 'Curated selection of refreshments, travel essentials, and car accessories.',
    icon: 'ShoppingBag',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'oil-change',
    name: 'Pro Maintenance',
    description: 'Swift oil changes and basic maintenance by certified technicians.',
    icon: 'Tool',
    image: 'https://images.unsplash.com/photo-1486006396193-471068589dca?auto=format&fit=crop&q=80&w=1200'
  }
];

export const OWNER_INFO = {
  name: 'Mizgin Oil Management',
  localName: 'مزگين ئۆيل',
  address: 'Zakho Way, Duhok, Iraq',
  location: 'Main Highway, Near Tanahi District',
  phone: '+964 750 000 0000',
  description: 'MIZGIN OIL has been a cornerstone of the Duhok community, providing high-quality energy solutions with a focus on trust and excellence since its inception.'
};
