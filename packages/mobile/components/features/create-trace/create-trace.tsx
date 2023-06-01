import React, { useState } from "react";
import { StyleSheet } from "react-native";

import CreateTraceDistance from "./distance/create-trace-distance";
import CreateTraceDuration from "./duration/create-trace-duration";
import { CreateTraceForm } from "../../../shared/types/create-trace-form";
import CreateTraceStartingPoint from "./starting-point/starting-point";
import { CreateTraceStep } from "../../../shared/types/create-trace-step";
import CreateTraceSubmit from "./submit/create-trace-submit";
import FormSteps from "../../shared/form-steps/form-steps";
import FormStepsFooter from "../../shared/form-steps/form-steps-footer";
import { FormatType } from "../../../shared/enums/FormatType.enum";
import SelectTrace from "./select-trace/select-trace";
import useCreationTracesMutation from "../../../shared/hooks/queries/useCreationTracesMutation.hook";
import { useLocationContext } from "../../../shared/contexts/location.context";
import useCreateTraceMutation from "../../../shared/hooks/queries/useCreateTraceMutation.hook";

export default function CreateTrace() {
  const { location } = useLocationContext();

  const creationTracesMutation = useCreationTracesMutation();
  const createTraceMutation = useCreateTraceMutation();

  const [formData, setFormData] = useState<CreateTraceForm>({
    format: FormatType.Short,
    startingPoint: {
      name: "Ma position actuelle",
      longitude: location?.coords.longitude || 0,
      latitude: location?.coords.latitude || 0,
    },
    trace: null,
    closingIn: 30,
  });

  const goNext = () => {
    if (currentStep === steps.length - 1) return;
    setCurrentStep(currentStep + 1);
  };

  const goBack = () => {
    if (currentStep === 0) return;
    setCurrentStep(currentStep - 1);
  };

  const steps: CreateTraceStep[] = [
    {
      id: 1,
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
              ? "Création en cours..."
              : "Créer la course"
          }
        />
      ),
    },
  ];

  const [currentStep, setCurrentStep] = useState<number>(0);

  return (
    <FormSteps
      title="🚀 Créer une course"
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
