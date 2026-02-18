
export enum FuelType {
  NORMAL = 'Normal Kar',
  ENHANCED = 'Enhanced',
  SUPER = 'Super'
}

export interface FuelPrice {
  type: FuelType;
  pricePerLiter: number;
  description: string;
}

export interface CoffeeItem {
  id: string;
  name: string;
  price: number;
}

export interface CustomItem {
  id: string;
  name: string;
  price: number;
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomItem[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  image: string;
  price?: number; // Added for editable service prices like Car Wash
}
