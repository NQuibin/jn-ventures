import { supabase } from '@/core/supabase';

export class SpotService {
  async listSpots() {
    const { data, error, status } = await supabase.from('spots').select();
    return data;
  }
}
