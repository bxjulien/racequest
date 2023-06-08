import { StyleSheet, View } from 'react-native';

import SkeletonLoader from '../skeleton-loader/skeleton-loader';

export default function TraceOverviewSkeleton({
  withoutEndDate = false,
}: {
  withoutEndDate?: boolean;
}) {
  return (
    <View style={styles.container}>
      <SkeletonLoader height={300} />

      <View style={styles.infos}>
        <SkeletonLoader width={90} height={40} />
        <SkeletonLoader width={90} height={40} />
        {!withoutEndDate && <SkeletonLoader width={90} height={40} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    height: 300,
    width: 300,
    marginRight: 20,
  },
  infos: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
