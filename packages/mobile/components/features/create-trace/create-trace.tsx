import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import CreateTraceDistance from "./distance/create-trace-distance";
import CreateTraceStartingPoint from "./starting-point/starting-point";
import FormSteps from "../../shared/form-steps/form-steps";
import FormStepsFooter from "../../shared/form-steps/form-steps-footer";
import { FormatType } from "../../../shared/enums/FormatType.enum";
import SelectTrace from "./select-trace/select-trace";
import { StartingPoint } from "../../../shared/types/starting-point.type";
import { Trace } from "../../../../api/src/shared/models/trace.model";
import useCreationTracesMutation from "../../../shared/hooks/queries/useCreationTracesMutation.hook";
import { useLocationContext } from "../../../shared/contexts/location.context";
import MapTrace from "../../shared/map-trace/map-trace";

const trace: any = [
  {
    longitude: 1.4292284,
    latitude: 43.6125484,
    distance: 5.872826467587691,
    geoJson: {
      geometry: {
        coordinates: [
          [1.429194, 43.612614],
          [1.429894, 43.612796],
          [1.430623, 43.612591],
          [1.431398, 43.612226],
          [1.431699, 43.611574],
          [1.432743, 43.611211],
          [1.433048, 43.611346],
          [1.433494, 43.611258],
          [1.436266, 43.61205],
          [1.436416, 43.611817],
          [1.438211, 43.611545],
          [1.438749, 43.611761],
          [1.439437, 43.61165],
          [1.439609, 43.612319],
          [1.442116, 43.611988],
          [1.442226, 43.611835],
          [1.443027, 43.612451],
          [1.443531, 43.612082],
          [1.445686, 43.610513],
          [1.445351, 43.610208],
          [1.446275, 43.609409],
          [1.445727, 43.608627],
          [1.445578, 43.607775],
          [1.44582, 43.607757],
          [1.44568, 43.601451],
          [1.44476, 43.601455],
          [1.443611, 43.601545],
          [1.440611, 43.601293],
          [1.440655, 43.601385],
          [1.439867, 43.60165],
          [1.439697, 43.60154],
          [1.439115, 43.601961],
          [1.438842, 43.601963],
          [1.437594, 43.602553],
          [1.435881, 43.603075],
          [1.435718, 43.60331],
          [1.434205, 43.601143],
          [1.434345, 43.60126],
          [1.432486, 43.601651],
          [1.43122, 43.601556],
          [1.431389, 43.601473],
          [1.431186, 43.60151],
          [1.431152, 43.601399],
          [1.43019, 43.601595],
          [1.429256, 43.601271],
          [1.428742, 43.60114],
          [1.428018, 43.602112],
          [1.428344, 43.608157],
          [1.428891, 43.608451],
          [1.430653, 43.609024],
          [1.428788, 43.612402],
          [1.429194, 43.612614],
        ],
        type: "LineString",
      },
      distance: 6180,
    },
  },
];

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
      name: "Ma position actuelle",
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
          canGoBack={true}
        />
      ),
    },
    {
      id: 3,
      title: "",
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
