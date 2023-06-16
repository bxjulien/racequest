import { Trace } from '../../../api/src/shared/models/trace.model';
import supabase from '../../lib/supabase/supabase.lib';

export const getTraces = () => {
  return supabase.from('countries').select('*');
};

export const getRace = async (id: number): Promise<Trace> => {
  try {
    const { data, error } = await supabase
      .from('traces')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    if (!data) {
      throw new Error('Trace not found');
    }

    return data as Trace;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getNearbyTraces = async (
  longitude: number,
  latitude: number,
  radius: number
): Promise<Trace[]> => {
  try {
    const response = await supabase.rpc('get_nearby_traces', {
      longitude,
      latitude,
      radius,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
