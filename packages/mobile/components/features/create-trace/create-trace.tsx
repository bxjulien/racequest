import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import CreateTraceDistance from './distance/create-trace-distance';
import CreateTraceStartingPoint from './starting-point/starting-point';
import FormSteps from '../../shared/form-steps/form-steps';
import FormStepsFooter from '../../shared/form-steps/form-steps-footer';
import { FormatType } from '../../../shared/enums/FormatType.enum';
import { StartingPoint } from '../../../shared/types/starting-point.type';
import { useLocationContext } from '../../../shared/contexts/location.context';

type CreateTrace = {
  format: FormatType;
  startingPoint: StartingPoint | null;
};

export default function CreateTrace() {
  const { location } = useLocationContext();

  const [formData, setFormData] = useState<CreateTrace>({
    format: FormatType.Short,
    startingPoint: {
      name: 'Ma position actuelle',
      longitude: location?.coords.longitude || 0,
      latitude: location?.coords.latitude || 0,
    },
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
        <FormStepsFooter goNext={goNext} goBack={goBack} canGoBack={true} />
      ),
    },
    {
      id: 3,
      title: 'Test ?',
      component: <View></View>,
      footer: (
        <FormStepsFooter goNext={goNext} goBack={goBack} canGoBack={true} />
      ),
    },
    {
      id: 4,
      title: 'Test ?',
      component: <View></View>,
      footer: (
        <FormStepsFooter goNext={goNext} goBack={goBack} canGoBack={true} />
      ),
    },
    {
      id: 5,
      title: 'Test ?',
      component: <View></View>,
      footer: (
        <FormStepsFooter goNext={goNext} goBack={goBack} canGoBack={true} />
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
