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
import CreateTraceScreen from './create-trace';
import HomeScreen from './home';
import Icon from '../components/shared/icon/icon';
import { Image } from 'react-native';
import LocationProvider from '../shared/contexts/location.context';
import MapScreen from './map';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const queryClient = new QueryClient();

const HomeTabs = () => (
  <Tab.Navigator>
    <Tab.Screen
      name='homeTab'
      component={HomeScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => (
          <Icon name='home' size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name='map'
      component={MapScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Icon name='map' size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

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
      <LocationProvider>
        <SafeAreaProvider>
          <Stack.Navigator>
            <Stack.Screen
              name='home'
              component={HomeTabs}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name='create-trace'
              component={CreateTraceScreen}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </SafeAreaProvider>
      </LocationProvider>
    </QueryClientProvider>
  );
}
