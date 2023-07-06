import { FlatList } from 'react-native';

import React from 'react';
import RaceOverviewSkeleton from '../trace-overview/trace-overview.skeleton';

export default function RaceListSkeleton(): JSX.Element {
  const items = Array.from({ length: 3 });

  return (
    <FlatList
      data={items}
      renderItem={() => <RaceOverviewSkeleton />}
      contentContainerStyle={{
        gap: 20,
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
}
