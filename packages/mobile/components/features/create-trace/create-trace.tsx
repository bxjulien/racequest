import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";

import FormSteps from "../../shared/form-steps/form-steps";
import CreateTraceDistance from "./distance/create-trace-distance";
import Button from "../../shared/button/button";
import { FormatType } from "../../../shared/enums/FormatType.enum";
import FormStepsFooter from "../../shared/form-steps/form-steps-footer";
import CreateTraceStartingPoint from "./starting-point/create-trace-starting-point";

export default function CreateTrace() {
  const [formData, setFormData] = useState({
    format: FormatType.Short,
  });

  const goNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const goBack = () => {
    setCurrentStep(currentStep - 1);
  };

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
      component: <CreateTraceStartingPoint />,
      footer: (
        <FormStepsFooter goNext={goNext} goBack={goBack} canGoBack={true} />
      ),
    },
  ];

  const [currentStep, setCurrentStep] = useState(0);

  return (
    <View style={styles.container}>
      <FormSteps
        title="🚀 Créer une course"
        steps={steps}
        activeStep={currentStep}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
});
