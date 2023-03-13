import { supabase } from '@/core/supabase';
import { NewSpot, Spot, SpotRow } from './types';
import {
  convertObjKeysToCamelCase,
  convertObjKeysToSnakeCase,
} from '@/utils/convertObjKeysToCase';

const TABLE_NAME = 'spots';
const TABLE_COLUMNS = {
  name: 'name',
  image: 'image',
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

  async addSpot(data: NewSpot): Promise<Spot> {
    const newSpotData = {
      ...data,
      visited: data.visited || false,
      favourite: data.favourite || false,
    } satisfies NewSpot;
    const transformedNewSpotData = convertObjKeysToSnakeCase(newSpotData);

    const result = await supabase
      .from(TABLE_NAME)
      .insert(transformedNewSpotData)
      .select();
    const newSpotRow = result.data as SpotRow[];

    return convertObjKeysToCamelCase(newSpotRow) as Spot;
  }
}
