import { UseQueryResult, useQuery } from "react-query";

import { Trace } from "../../../../api/src/shared/models/trace.model";
import { UseQueryOptions } from "../../types/use-query-options.type";
import { getCreationTraces } from "../../services/api.service";

const useCreationTracesQuery = (
  longitude: number,
  latitude: number,
  distance: number,
  options: UseQueryOptions = {}
): UseQueryResult<Trace[], Error> => {
  const key = ["nearby_traces", longitude, latitude, distance];

  return useQuery(
    key,
    async () => {
      return getCreationTraces(longitude, latitude, distance).then(
        (result) => result.data
      );
    },
    options
  );
};

export default useCreationTracesQuery;
