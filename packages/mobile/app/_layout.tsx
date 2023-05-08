import { QueryClient, QueryClientProvider } from 'react-query';

import CreateTraceScreen from './create-trace';
import HomeScreen from './home';
import LocationProvider from '../shared/contexts/location.context';
import MapScreen from './map';
import React from 'react';
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
      }}
    />
    <Tab.Screen
      name='map'
      component={MapScreen}
      options={{
        headerShown: false,
      }}
    />
  </Tab.Navigator>
);

export default function RootLayout() {
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
