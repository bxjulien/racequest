import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import CreateTraceDistance from './distance/create-trace-distance';
import CreateTraceStartingPoint from './starting-point/starting-point';
import FormSteps from '../../shared/form-steps/form-steps';
import FormStepsFooter from '../../shared/form-steps/form-steps-footer';
import { FormatType } from '../../../shared/enums/FormatType.enum';
import SelectTrace from './select-trace/select-trace';
import { StartingPoint } from '../../../shared/types/starting-point.type';
import { Trace } from '../../../../api/src/shared/models/trace.model';
import useCreationTracesMutation from '../../../shared/hooks/queries/useCreationTracesMutation.hook';
import { useLocationContext } from '../../../shared/contexts/location.context';

type CreateTrace = {
  format: FormatType;
  startingPoint: StartingPoint | null;
  traces: Trace[] | null;
};

export default function CreateTrace() {
  const { location } = useLocationContext();

  const creationTracesMutation = useCreationTracesMutation();

  const [formData, setFormData] = useState<CreateTrace>({
    format: FormatType.Short,
    startingPoint: {
      name: 'Ma position actuelle',
      longitude: location?.coords.longitude || 0,
      latitude: location?.coords.latitude || 0,
    },
    traces: null,
  });

  const goNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const goBack = () => {
    setCurrentStep(currentStep - 1);
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const steps = [
    {
      id: 1,
      title: 'On pars sur quel format ?',
      component: (
        <CreateTraceDistance
          value={formData.format}
          setValue={(value) => setFormData({ ...formData, format: value })}
        />
      ),
      footer: (
        <FormStepsFooter goNext={goNext} goBack={goBack} canGoBack={true} />
      ),
    },
    {
      id: 2,
      title: 'On démarre où ?',
      component: (
        <CreateTraceStartingPoint
          value={formData.startingPoint}
          setValue={(value) =>
            setFormData({ ...formData, startingPoint: value })
          }
        />
      ),
      footer: (
        <FormStepsFooter
          goNext={() => {
            creationTracesMutation.mutate([
              formData.startingPoint?.longitude || 0,
              formData.startingPoint?.latitude || 0,
              formData.format === FormatType.Short
                ? 5
                : formData.format === FormatType.Medium
                ? 10
                : 15,
            ]);
            goNext();
          }}
          goBack={goBack}
          canGoBack={true}
        />
      ),
    },
    {
      id: 3,
      title: '',
      component: (
        <SelectTrace
          loading={creationTracesMutation.isLoading}
          error={creationTracesMutation.isError}
          traces={creationTracesMutation.data}
        />
      ),
      footer: (
        <FormStepsFooter
          goNext={goNext}
          canGoNext={Boolean(formData.traces && formData.traces.length)}
          goBack={goBack}
          canGoBack={true}
        />
      ),
    },
  ];

  const [currentStep, setCurrentStep] = useState(0);

  return (
    <FormSteps
      title='🚀 Créer une course'
      steps={steps}
      activeStep={currentStep}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
});
