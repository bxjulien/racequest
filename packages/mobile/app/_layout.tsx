import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MapScreen from "./map";
import HomeScreen from "./home";
import { QueryClient, QueryClientProvider } from "react-query";
import CreateTraceScreen from "./create-trace";

const Tab = createBottomTabNavigator();

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <Tab.Navigator>
          <Tab.Screen
            name="home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="create-trace"
            component={CreateTraceScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="map"
            component={MapScreen}
            options={{ headerShown: false }}
          />
        </Tab.Navigator>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
