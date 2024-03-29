import type { NewSpot, Spot, SpotRow, SpotType } from './types';

import { supabase } from '@/core/supabase';
import _ from 'lodash';
import {
  convertObjKeysToCamelCase,
  convertObjKeysToSnakeCase,
} from '@/utils/convertObjKeysToCase';
import { DuplicateGooglePlaceIdError } from './errors';

const TABLE_NAME = 'spots';
const TABLE_COLUMNS = {
  key: 'key',
  name: 'name',
  image: 'image',
  type: 'type',
  visited: 'visited',
  favourite: 'favourite',
  googlePlaceId: 'google_place_id',
  area: 'area',
};

// TODO add error validations
// TODO check for unique google place id

interface ListSpotsFilters {
  type?: SpotType;
  visited?: boolean;
  favourite?: boolean;
  area?: string
}

export class SpotService {
  async listSpots(filters?: ListSpotsFilters): Promise<Spot[]> {
    let query = supabase.from(TABLE_NAME).select().order(TABLE_COLUMNS.name);

    if (filters) {
      Object.entries(filters).forEach(entry => {
        const [filterKey, filterValue] = entry as [
          keyof ListSpotsFilters,
          SpotType | boolean
        ];

        if (filterValue !== undefined && filterKey in TABLE_COLUMNS) {
          query = query.eq(filterKey, filterValue);
        }
      });
    }

    const result = await query;
    const spotRows = result.data as SpotRow[];

    return convertObjKeysToCamelCase(spotRows) as Spot[];
  }

  async retrieveSpotByGooglePlaceId(
    googlePlaceId: string
  ): Promise<Spot | undefined> {
    const result = await supabase
      .from(TABLE_NAME)
      .select()
      .eq(TABLE_COLUMNS.googlePlaceId, googlePlaceId)
      .single();
    const spotRow = result.data as SpotRow;

    if (!spotRow) {
      return undefined;
    }

    return convertObjKeysToCamelCase(spotRow) as Spot;
  }

  async addSpot(data: NewSpot): Promise<Spot> {
    // prevent duplicates by checking for an existing google place id
    const spot = await this.retrieveSpotByGooglePlaceId(data.googlePlaceId);
    if (spot) {
      throw new DuplicateGooglePlaceIdError(data.googlePlaceId);
    }

    const newSpotData = {
      ...data,
      area: _.capitalize(data.area),
      visited: data.visited || false,
      favourite: data.favourite || false,
    } satisfies NewSpot;
    const transformedNewSpotData = convertObjKeysToSnakeCase(newSpotData);

    // TODO add error validations

    const result = await supabase
      .from(TABLE_NAME)
      .insert(transformedNewSpotData)
      .select();
    const newSpotRow = result.data as SpotRow[];

    return convertObjKeysToCamelCase(newSpotRow) as Spot;
  }

  async listSpotAreas(): Promise<string[]> {
    const result = await supabase.rpc('spot_areas');
    const data = result.data as Array<{ area: string }>;
    return data.map(d => d.area);
  }
}
