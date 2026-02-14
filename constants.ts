
import { FuelType, FuelPrice, Service } from './types';

export const FUEL_PRICES: FuelPrice[] = [
  {
    type: FuelType.NORMAL,
    pricePerLiter: 770,
    description: "Standard fuel for everyday commuting, high efficiency for regular engines."
  },
  {
    type: FuelType.ENHANCED,
    pricePerLiter: 1000,
    description: "Improved performance and cleaner combustion for modern vehicles."
  },
  {
    type: FuelType.SUPER,
    pricePerLiter: 1250,
    description: "Premium high-octane fuel for high-performance and luxury engines."
  }
];

export const SERVICES: Service[] = [
  {
    id: 'car-wash',
    name: 'Car Wash',
    description: 'Professional cleaning service using high-quality detergents and soft-touch technology.',
    icon: 'Droplets',
    image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'coffee-shop',
    name: 'Coffee Shop',
    description: 'Freshly brewed coffee and snacks to enjoy while your car is getting ready.',
    icon: 'Coffee',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'market',
    name: 'Market',
    description: '24/7 convenience store stocked with essentials, snacks, and automotive supplies.',
    icon: 'ShoppingBag',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'oil-change',
    name: 'Oil Change',
    description: 'Expert lubricant service and fluid checks to keep your engine running smoothly.',
    icon: 'Tool',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=800'
  }
];

export const OWNER_INFO = {
  name: "Mizgin",
  localName: "مزگين هات ئوێیل",
  phone: "0750 150 6000",
  address: "Zakho way Road, near Tanahi District, Duhok",
  location: "Zakho way Road, Duhok",
  description: "Mizgin Oil stands as Duhok's premier destination for high-quality energy and automotive care. Under the dedicated leadership of Owner Mizgin, we have redefined the refueling experience by combining world-class fuel standards with a sophisticated suite of concierge services. Our commitment to precision, purity, and the local community ensures that every visit powers your journey with unmatched reliability and luxury."
};
