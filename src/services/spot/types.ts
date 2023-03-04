export type SpotType =
  | 'bakery'
  | 'bar'
  | 'brunch'
  | 'cafe'
  | 'dessert'
  | 'restaurant';

export interface Spot {
  key: string;
  name: string;
  type: SpotType;
  area: string;
  address: string;
  cuisines: string;
  website?: string;
  googleMapsLink: string;
  visited: boolean;
  favourite: boolean;
  image?: string;
  updatedAt: string;
  createdAt: string;
}

export interface SpotRow
  extends Omit<Spot, 'googleMapsLink' | 'updatedAt' | 'createdAt'> {
  google_maps_link: Spot['googleMapsLink'];
  updated_at: Spot['updatedAt'];
  created_at: Spot['createdAt'];
}
