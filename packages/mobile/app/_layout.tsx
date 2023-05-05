import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MapScreen from "./map";
import HomeScreen from "./home";

const Tab = createBottomTabNavigator();

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Tab.Navigator>
        <Tab.Screen
          name="home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="map"
          component={MapScreen}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
}
