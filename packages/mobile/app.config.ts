import 'dotenv/config';

import { ExpoConfig } from '@expo/config';

const config: ExpoConfig = {
  name: 'racequest-app',
  slug: 'racequest-app',
  scheme: 'racequest-app',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  extra: {
    SUPABASE_API_KEY: process.env.SUPABASE_API_KEY,
    SUPABASE_URL: process.env.SUPABASE_URL,
    MAPBOX_API_KEY: process.env.MAPBOX_API_KEY,
  },
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
  },
  web: {
    favicon: './assets/favicon.png',
    bundler: 'metro',
  },
};

export default config;
