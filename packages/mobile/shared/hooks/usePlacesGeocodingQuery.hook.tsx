import { UseQueryResult, useQuery } from "react-query";

import { getPlaces } from "../services/mapbox.service";

interface UseNearbyTracesQueryOptions {
  enabled?: boolean;
}

type Place = {
  place_name: string;
  center: number[];
};

const useNearbyTracesQuery = (
  query: string,
  options: UseNearbyTracesQueryOptions = {}
): UseQueryResult<Place[], Error> => {
  const key = ["geocoding_places"];

  return useQuery(
    key,
    async () => {
      return getPlaces(query).then((result) => result.features);
    },
    options
  );
};

export default useNearbyTracesQuery;
