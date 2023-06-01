import { UseMutationResult, useMutation } from 'react-query';

import { Trace } from '../../../../api/src/shared/models/trace.model';
import { CreateTraceForm } from '../../types/create-trace-form';
import { createTrace } from '../../services/api.service';

const useCreateTraceMutation = (): UseMutationResult<
  Trace[],
  Error,
  CreateTraceForm
> => {
  return useMutation({
    mutationFn: (params: CreateTraceForm) => {
      return createTrace(params);
    },
  });
};

export default useCreateTraceMutation;
