import React, { useState } from 'react';

import CreateTraceDistance from './distance/create-trace-distance';
import CreateTraceDuration from './duration/create-trace-duration';
import { CreateTraceForm } from '../../../shared/types/create-trace-form';
import CreateTraceStartingPoint from './starting-point/starting-point';
import { CreateTraceStep } from '../../../shared/types/create-trace-step';
import CreateTraceSubmit from './submit/create-trace-submit';
import FormSteps from '../../shared/form-steps/form-steps';
import FormStepsFooter from '../../shared/form-steps/form-steps-footer';
import { FormatType } from '../../../shared/enums/FormatType.enum';
import SelectTrace from './select-trace/select-trace';
import { StyleSheet } from 'react-native';
import useCreateTraceMutation from '../../../shared/hooks/queries/useCreateTraceMutation.hook';
import useCreationTracesMutation from '../../../shared/hooks/queries/useCreationTracesMutation.hook';
import { useLocationContext } from '../../../shared/contexts/location.context';
import { useRouter } from 'expo-router';

export default function CreateTrace() {
  const router = useRouter();
  const { location } = useLocationContext();

  const creationTracesMutation = useCreationTracesMutation();
  const createTraceMutation = useCreateTraceMutation();

  const [formData, setFormData] = useState<CreateTraceForm>({
    format: FormatType.Short,
    startingPoint: {
      name: 'Ma position actuelle',
      longitude: location?.coords.longitude || 0,
      latitude: location?.coords.latitude || 0,
    },
    trace: null,
    closingIn: 30,
  });

  const goNext = () => {
    if (currentStepIndex === steps.length - 1) return;
    setCurrentStepIndex(currentStepIndex + 1);
  };

  const goBack = () => {
    if (currentStepIndex === 0) return router.back();
    setCurrentStepIndex(currentStepIndex - 1);
  };

  const steps: CreateTraceStep[] = [
    {
      id: 1,
      title: 'On pars sur quel format ?',
      component: (
        <CreateTraceDistance
          value={formData.format}
          setValue={(value) => setFormData({ ...formData, format: value })}
        />
      ),
      footer: <FormStepsFooter goNext={goNext} goBack={goBack} />,
    },
    {
      id: 2,
      title: "On démarre d'où ?",
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
                ? 4
                : formData.format === FormatType.Medium
                ? 8
                : 14,
            ]);
            goNext();
          }}
          goBack={goBack}
        />
      ),
    },
    {
      id: 3,
      title: 'On pars sur quel parcours ?',
      component: (
        <SelectTrace
          value={formData.trace}
          setValue={(value) => setFormData({ ...formData, trace: value })}
          loading={creationTracesMutation.isLoading}
          error={creationTracesMutation.isError}
          traces={creationTracesMutation.data}
        />
      ),
      footer: (
        <FormStepsFooter
          goNext={goNext}
          canGoNext={Boolean(formData.trace)}
          goBack={goBack}
        />
      ),
    },
    {
      id: 4,
      title: 'On clôture dans combien de jours ?',
      subtitle:
        'Après ce délai, le classement de la course sera figé et les recompenses seront distribuées.',
      component: (
        <CreateTraceDuration
          value={formData.closingIn}
          setValue={(value) => setFormData({ ...formData, closingIn: value })}
        />
      ),
      footer: (
        <FormStepsFooter
          goNext={goNext}
          canGoNext={Boolean(formData.closingIn)}
          goBack={goBack}
        />
      ),
    },
    {
      id: 5,
      title: 'Tout est prêt !',
      subtitle:
        "Il ne reste plus qu'à créer la course et partir à l'aventure !",
      component: <CreateTraceSubmit value={formData} />,
      footer: (
        <FormStepsFooter
          goNext={async () => {
            await createTraceMutation.mutateAsync(formData);
            goNext();
          }}
          goBack={goBack}
          goNextTitle={
            createTraceMutation.isLoading
              ? 'Création en cours...'
              : 'Créer la course'
          }
        />
      ),
    },
  ];

  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  return (
    <FormSteps
      title='🚀 Créer une course'
      steps={steps}
      activeStepIndex={currentStepIndex}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
});
