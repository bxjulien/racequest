import React from "react";

import { View, StyleSheet } from "react-native";
import SkeletonLoader from "../../../shared/skeleton-loader/skeleton-loader";

export default function SelectTraceSkeleton() {
  return (
    <View style={styles.container}>
      <SkeletonLoader style={styles.title} width={"65%"} height={40} />
      <SkeletonLoader height={400} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <SkeletonLoader width={"45%"} height={150} />
        <SkeletonLoader width={"45%"} height={150} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  title: {
    marginTop: 20,
  },
});
