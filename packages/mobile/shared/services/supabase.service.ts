import supabase from '../../lib/supabase/supabase.lib';

export const getTraces = () => {
  return supabase.from('countries').select('*');
};

export const getNearbyTraces = (
  longitude: number,
  latitude: number,
  radius: number
) => {
  return supabase.rpc('nearby_traces', {
    longitude,
    latitude,
    radius,
  });
};
