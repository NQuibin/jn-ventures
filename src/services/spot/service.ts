import { supabase } from '@/core/supabase';
import { Spot } from './types';

export class SpotService {
  async listSpots(): Promise<Spot[]> {
    const result = await supabase.from('spots').select();
    return result.data as Spot[];
  }
}
