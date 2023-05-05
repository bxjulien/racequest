import supabase from "../../lib/supabase/supabase.lib"

export const getTraces = () => {
  return supabase.from('countries').select('*');
}