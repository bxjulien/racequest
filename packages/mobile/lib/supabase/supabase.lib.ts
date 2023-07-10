import 'react-native-url-polyfill/auto'; // usefull for current version of supabase-js

import * as SecureStore from 'expo-secure-store';

import Constants from 'expo-constants';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = Constants?.manifest?.extra?.SUPABASE_URL;
const SUPABASE_API_KEY = Constants?.manifest?.extra?.SUPABASE_API_KEY;

if (!SUPABASE_URL || !SUPABASE_API_KEY)
  throw new Error('Missing SUPABASE_URL or SUPABASE_API_KEY');

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key);
  },
};

const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY, {
  auth: {
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export default supabase;
