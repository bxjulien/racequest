import { StyleSheet, View } from 'react-native';

import React from 'react';
import SkeletonLoader from '../../shared/skeleton-loader/skeleton-loader';

export default function UserSkeleton() {
  return (
    <View style={styles.container}>
      <SkeletonLoader height={50} width={50} />
      <SkeletonLoader width={'60%'} height={60} />
      <SkeletonLoader width={'100%'} height={60} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
  },
});
