import { Race } from '../types/race.type';
import supabase from '../../lib/supabase/supabase.lib';

/* export const getRace = async (
  id: number,
  longitude: number | undefined,
  latitude: number | undefined
): Promise<Race> => {
  try {
    const response = await supabase.rpc('get_race', {
      _id: id,
      _longitude: longitude,
      _latitude: latitude,
    });

    return response.data as Race;
  } catch (error) {
    console.error(error);
    throw error;
  }
}; */
