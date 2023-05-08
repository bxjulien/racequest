import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";

import FormSteps from "../../shared/form-steps/form-steps";
import CreateTraceDistance from "./distance/create-trace-distance";
import Button from "../../shared/button/button";
import { DistanceType } from "../../../shared/enums/DistanceType.enum";
import FormStepsFooter from "../../shared/form-steps/form-steps-footer";

export default function CreateTrace() {
  const [formData, setFormData] = useState({
    distance: DistanceType.Short,
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
          value={formData.distance}
          setValue={(value) => setFormData({ ...formData, distance: value })}
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
        <View>
          <Text>Step 2</Text>
        </View>
      ),
      footer: (
        <FormStepsFooter goNext={goNext} goBack={goBack} canGoBack={true} />
      ),
    },
  ];

  const [currentStep, setCurrentStep] = useState(0);

  return (
    <View style={styles.container}>
      <FormSteps
        title="🚀 Créer une compétition"
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
  }
});
