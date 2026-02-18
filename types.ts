
// Enum representing the predefined fuel grades available at the station
export enum FuelType {
  NORMAL = 'Normal Kar',
  ENHANCED = 'Enhanced',
  SUPER = 'Super'
}

export type Language = 'en' | 'ku-ba' | 'ku-so' | 'ar' | 'tr';

export interface FuelPrice {
  type: string;
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
  price?: number;
}
