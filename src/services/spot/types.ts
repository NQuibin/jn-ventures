import { PartialBy } from '../../utils/customUtilityTypes';

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
  website?: string | null;
  googlePlaceId: string;
  googleMapsLink: string;
  visited: boolean;
  favourite: boolean;
  image?: string | null;
  updatedAt: string;
  createdAt: string;
}

export interface SpotRow
  extends Omit<Spot, 'googleMapsLink' | 'googlePlaceId' | 'updatedAt' | 'createdAt'> {
  google_place_id: Spot['googlePlaceId']
  google_maps_link: Spot['googleMapsLink'];
  updated_at: Spot['updatedAt'];
  created_at: Spot['createdAt'];
}

export type NewSpot = PartialBy<
  Omit<Spot, 'key' | 'image' | 'updatedAt' | 'createdAt'>,
  'visited' | 'favourite'
>;
