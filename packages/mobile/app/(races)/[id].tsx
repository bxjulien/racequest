import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Trace } from '../../../api/src/shared/models/trace.model';
import { useQuery } from 'react-query';
import { getRace } from '../../shared/services/supabase.service';

const useRace = (id: string) => {
  const { data, isError, isLoading } = useQuery<Trace>(
    `race-${id}`,
    () => getRace(+id),
    {
      enabled: !!id,
      staleTime: 1000 * 60, // 1 minute
    }
  );

  return { data, isError, isLoading };
};

export default function Race({}): JSX.Element {
  const { id } = useLocalSearchParams();
  const { data, isError, isLoading } = useRace(id as string);

  if (isLoading) return <Text>Loading</Text>;

  if (isError) return <Text>Error</Text>;

  return (
    <SafeAreaView>
      <Text>Race id {id}</Text>
      <Text>{data?.name}</Text>
    </SafeAreaView>
  );
}
