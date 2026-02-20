
import { FuelPrice, Service } from './types';

export const BRAND_LOGO_URL = 'https://i.postimg.cc/DJgv1vKF/462631691-122107837820551166-1205886789451223005-n-1-removebg-preview-(1).png';

export const LEGACY_BRAND_IMAGE = 'https://i.postimg.cc/m1ybNbxq/462631691-122107837820551166-1205886789451223005-n-1-removebg-preview.png';

export const FUEL_PRICES: FuelPrice[] = [
  {
    type: 'Normal Kar',
    pricePerLiter: 770,
    description: 'Standard performance fuel for everyday commuting and reliability.'
  },
  {
    type: 'Enhanced',
    pricePerLiter: 1000,
    description: 'Optimized combustion for better mileage and engine cleanliness.'
  },
  {
    type: 'Super',
    pricePerLiter: 1250,
    description: 'High-octane premium blend for maximum power and engine protection.'
  },
  {
    type: 'Elite Gasoline',
    pricePerLiter: 1000,
    description: 'Refined grades tailored for specialized engine performance.'
  },
  {
    type: 'Pure Kerosene',
    pricePerLiter: 1000,
    description: 'Ultra-high purity for critical industrial and domestic heating.'
  },
  {
    type: 'Refined LPG',
    pricePerLiter: 1000,
    description: 'Clean, consistent energy flow for sustainable applications.'
  }
];

// Empty by default to allow manual addition via Admin
export const SERVICES: Service[] = [];

export const OWNER_INFO = {
  name: 'Mizgin Oil Management',
  localName: 'مزگين ئۆيل',
  address: 'Zakho Way, Duhok',
  location: 'Main Highway, Near Tanahi District',
  phone: '+964 750 000 0000',
  description: 'MIZGIN OIL has been a cornerstone of the Duhok community, providing high-quality energy solutions with a focus on trust and excellence since its inception.'
};
