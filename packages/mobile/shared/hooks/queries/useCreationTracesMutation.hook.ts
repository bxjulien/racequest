import { UseMutationResult, useMutation } from 'react-query';

import { Trace } from '../../../../api/src/shared/models/trace.model';
import { getCreationTraces } from '../../services/api.service';

const useCreationTracesMutation = (): UseMutationResult<
  Trace[],
  Error,
  [number, number, number]
> => {
  return useMutation({
    mutationFn: (params: [number, number, number]) => {
      const [longitude, latitude, distance] = params;
      return getCreationTraces(longitude, latitude, distance);
    },
  });
};

export default useCreationTracesMutation;
