import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { StatusBar } from "expo-status-bar";
import useTracesQuery from "../shared/hooks/useTracesQuery.hook";

export default function HomeScreen() {
  const { data: countries, isError, isLoading } = useTracesQuery();

  if (isLoading) return <Text>Loading...</Text>;

  if (isError) return <Text>Error</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <Text>Home</Text>
      {countries?.map((country: any) => (
        <Text key={country.id}>{country.name}</Text>
      ))}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});
