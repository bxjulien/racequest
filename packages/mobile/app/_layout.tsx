import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { QueryClient, QueryClientProvider } from 'react-query';
import React, { useEffect, useState } from 'react';

import { Asset } from 'expo-asset';
import AuthContextProvider from '../shared/contexts/auth.context';
import { Image } from 'react-native';
import LocationProvider from '../shared/contexts/location.context';
import { RQText } from '../components/shared/text/text';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Slot } from 'expo-router';
import ThemeContextProvider from '../shared/contexts/theme.context';

const queryClient = new QueryClient();

function cacheImages(images: any[]) {
  return images.map((image) => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts: any[]) {
  return fonts.map((font) => Font.loadAsync(font));
}

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        const imageAssets = cacheImages([
          // require('./assets/images/splash.png'),
        ]);

        const fontAssets = cacheFonts([
          FontAwesome.font,
          MaterialIcons.font,
          MaterialCommunityIcons.font,
        ]);

        await Promise.all([...imageAssets, ...fontAssets]);
      } catch (e) {
        console.error(e);
      } finally {
        setAppIsReady(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!appIsReady) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <ThemeContextProvider>
          <LocationProvider>
            <SafeAreaProvider>
              <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
                <RQText
                  style={{ backgroundColor: 'black', textAlign: 'center' }}
                >
                  Race Quest alpha
                </RQText>
                <Slot />
              </SafeAreaView>
            </SafeAreaProvider>
          </LocationProvider>
        </ThemeContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
