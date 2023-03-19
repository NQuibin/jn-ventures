import { supabase } from '@/core/supabase';
import { NewSpot, Spot, SpotRow } from './types';
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
  googlePlaceId: 'google_place_id',
};

// TODO add error validations
// TODO check for unique google place id

export class SpotService {
  async listSpots(): Promise<Spot[]> {
    const result = await supabase
      .from(TABLE_NAME)
      .select()
      .order(TABLE_COLUMNS.image)
      .order(TABLE_COLUMNS.name);
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
}
