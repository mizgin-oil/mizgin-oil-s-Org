
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

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  image: string;
}
