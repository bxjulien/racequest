import { CreateTraceForm } from '../../../../shared/types/create-trace-form';
import { Error } from './error/error';
import React from 'react';
import TraceOverview from '../../../shared/trace-overview/trace-overview';

type CreateTraceSubmitProps = {
  value: CreateTraceForm;
};

export default function CreateTraceSubmit({ value }: CreateTraceSubmitProps) {
  if (!value.trace) return <Error />;

  return <TraceOverview trace={value.trace} />;
}
