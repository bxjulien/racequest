import { UseQueryResult, useQuery } from 'react-query';

import { Trace } from '../../../../api/src/shared/models/trace.model';
import { UseQueryOptions } from '../../types/use-query-options.type';
import { getNearbyTraces } from '../../services/supabase.service';

const useNearbyTracesQuery = (
  longitude: number,
  latitude: number,
  radius: number,
  options: UseQueryOptions = {}
): UseQueryResult<Trace[], Error> => {
  const key = ['nearby_traces'];

  return useQuery(
    key,
    async () => {
      return getNearbyTraces(longitude, latitude, radius).then(
        (result) => result.data
      );
    },
    {
      ...options,
      staleTime: 30000, // Fetch new data if the last fetch was more than 30 seconds ago
    }
  );
};

export default useNearbyTracesQuery;
