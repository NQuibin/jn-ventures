import { supabase } from '@/core/supabase';
import { Spot, SpotRow } from './types';
import { convertObjKeysToCamelCase } from '../../utils/convertObjKeysToCase';

export class SpotService {
  async listSpots(): Promise<Spot[]> {
    const result = await supabase.from('spots').select().order('name');
    const spotRows = result.data as SpotRow[];
    return convertObjKeysToCamelCase(spotRows) as Spot[];
  }
}
