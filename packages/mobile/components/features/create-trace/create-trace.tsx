import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";

import FormSteps from "../../shared/form-steps/form-steps";
import CreateTraceDistance from "./distance/create-trace-distance";
import Button from "../../shared/button/button";
import { DistanceType } from "../../../shared/enums/DistanceType.enum";

export default function CreateTrace() {
  const [formData, setFormData] = useState({
    distance: DistanceType.Short,
  });

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
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
        <MainFooter goNext={handleNext} goBack={handleBack} canGoBack={true} />
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
        <MainFooter goNext={handleNext} goBack={handleBack} canGoBack={true} />
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

const MainFooter = ({
  goNext,
  canGoNext = true,
  goBack,
  canGoBack = true,
}: {
  goNext: () => void;
  canGoNext?: boolean;
  goBack: () => void;
  canGoBack: boolean;
}) => {
  return (
    <View style={styles.footer}>
      <Button
        title="Retour"
        style={styles.backButton}
        onPress={goBack}
        disabled={!canGoBack}
      />
      <Button
        style={styles.nextButton}
        title="Continuer"
        onPress={goNext}
        disabled={!canGoNext}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  footer: {
    flexDirection: "row",
    gap: 10,
  },
  backButton: {
    flex: 0.4,
  },
  nextButton: {
    flex: 1,
    height: 80,
  },
});
