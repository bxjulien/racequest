import 'react-native-url-polyfill/auto'; // usefull for current version of supabase-js

import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

const SUPABASE_URL = Constants?.manifest?.extra?.SUPABASE_URL;
const SUPABASE_API_KEY = Constants?.manifest?.extra?.SUPABASE_API_KEY;

if (!SUPABASE_URL || !SUPABASE_API_KEY) 
  throw new Error('Missing SUPABASE_URL or SUPABASE_API_KEY');

const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export default supabase;
