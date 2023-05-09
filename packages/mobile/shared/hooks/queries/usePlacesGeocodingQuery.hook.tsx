import { UseQueryResult, useQuery } from 'react-query';

import { Place } from '../../types/place.type';
import { UseQueryOptions } from '../../types/use-query-options.type';
import { getPlaces } from '../../services/mapbox.service';

export default function usePlacesGeocodingQuery(
  query: string,
  options: UseQueryOptions = {}
): UseQueryResult<Place[], Error> {
  const key = ['geocoding_places', query];

  return useQuery(
    key,
    async () => {
      return getPlaces(query).then((result) => {
        return result.features;
      });
    },
    options
  );
}
