import { StyleSheet, View, FlatList } from 'react-native';

import React from 'react';
import TraceOverviewSkeleton from '../../shared/trace-overview/trace-overview.skeleton';

export default function NearbyTracesSkeleton(): JSX.Element {
  const items = [1, 2, 3];

  return (
    <FlatList
      data={items}
      renderItem={() => <TraceOverviewSkeleton />}
      contentContainerStyle={{
        gap: 20,
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 280,
    width: 280,
    marginRight: 20,
  },
  infos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
