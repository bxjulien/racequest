import { Trace } from '../../../api/src/shared/models/trace.model';
import supabase from '../../lib/supabase/supabase.lib';

export const getTraces = () => {
  return supabase.from('countries').select('*');
};

export const getNearbyTraces = async (
  longitude: number,
  latitude: number,
  radius: number
): Promise<Trace[]> => {
  const response = await supabase.rpc('get_nearby_traces', {
    longitude,
    latitude,
    radius,
  });

  return response.data;
};
