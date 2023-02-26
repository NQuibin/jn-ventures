export interface Spot {
  id: number;
  key: string;
  name: string;
  type: string;
  area: string;
  address: string;
  cuisines: string;
  website: string | null;
  google_maps_link: string | null;
  visited: boolean;
  favourite: boolean;
  updated_at: string;
  created_at: string;
  image: string | null;
}
