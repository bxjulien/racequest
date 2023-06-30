import { Race } from '../types/race.type';
import supabase from '../../lib/supabase/supabase.lib';

export const getRaces = () => {
  return supabase.from('countries').select('*');
};

export const getRace = async (id: number): Promise<Race> => {
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
      throw new Error('Race not found');
    }

    return data as Race;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getNearbyRaces = async (
  longitude: number,
  latitude: number,
  radius: number
): Promise<Race[]> => {
  try {
    const response = await supabase.rpc('get_nearby_races', {
      longitude,
      latitude,
      radius,
    });

    return response.data as Race[];
  } catch (error) {
    console.error(error);
    throw error;
  }
};
