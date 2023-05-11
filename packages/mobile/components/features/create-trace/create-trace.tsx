import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { StyleSheet, Text, View } from "react-native";
import CreateTraceDistance from "./distance/create-trace-distance";
import CreateTraceStartingPoint from "./starting-point/starting-point";
import FormSteps from "../../shared/form-steps/form-steps";
import FormStepsFooter from "../../shared/form-steps/form-steps-footer";
import { FormatType } from "../../../shared/enums/FormatType.enum";
import { StartingPoint } from "../../../shared/types/starting-point.type";
import { useLocationContext } from "../../../shared/contexts/location.context";
import SelectTrace from "./select-trace/select-trace";
import { Trace } from "../../../../api/src/shared/models/trace.model";
import { getCreationTraces } from "../../../shared/services/api.service";

type CreateTrace = {
  format: FormatType;
  startingPoint: StartingPoint | null;
  traces: Trace[] | null;
};

export default function CreateTrace() {
  const { location } = useLocationContext();

  const [formData, setFormData] = useState<CreateTrace>({
    format: FormatType.Short,
    startingPoint: {
      name: "Ma position actuelle",
      longitude: location?.coords.longitude || 0,
      latitude: location?.coords.latitude || 0,
    },
    traces: null,
  });

  const createTracesMutation = useMutation(
    ({
      longitude,
      latitude,
      distance,
    }: {
      longitude: number;
      latitude: number;
      distance: number;
    }) => getCreationTraces(longitude, latitude, distance)
  );

  const goNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const goBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const getTraces = () => {
    createTracesMutation.mutate({
      longitude: location?.coords.longitude || 0,
      latitude: location?.coords.latitude || 0,
      distance:
        formData.format === FormatType.Short
          ? 5
          : formData.format === FormatType.Medium
          ? 10
          : 15,
    });
    goNext();
  };

  useEffect(() => {
    if (
      !createTracesMutation.isLoading &&
      !createTracesMutation.isError &&
      createTracesMutation.data
    ) {
      setFormData((prevData) => ({
        ...prevData,
        traces: createTracesMutation.data,
      }));
    }
  }, [
    createTracesMutation.isLoading,
    createTracesMutation.isError,
    createTracesMutation.data,
  ]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const steps = [
    {
      id: 1,
      title: "On pars sur quel format ?",
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
      title: "On démarre où ?",
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
            goNext();
          }}
          goBack={goBack}
          canGoBack={true}
        />
      ),
    },
    {
      id: 3,
      title: "Test ?",
      component: (
        <SelectTrace
          loading={createTracesMutation.isLoading}
          error={createTracesMutation.isError}
          traces={formData.traces}
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
    {
      id: 4,
      title: "Test ?",
      component: <View></View>,
      footer: (
        <FormStepsFooter goNext={goNext} goBack={goBack} canGoBack={true} />
      ),
    },
    {
      id: 5,
      title: "Test ?",
      component: <View></View>,
      footer: (
        <FormStepsFooter goNext={goNext} goBack={goBack} canGoBack={true} />
      ),
    },
  ];

  const [currentStep, setCurrentStep] = useState(0);

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
