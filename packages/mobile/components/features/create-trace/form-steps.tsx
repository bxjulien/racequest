import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Step } from "./step";
import { ProgressBar } from "react-native-paper";
import { RadioButton } from "../../shared/radio/radio";

export const FormSteps = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const progress = currentStep / 3;

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>📏 On pars sur quelle distance ?</Text>
      <ProgressBar
        progress={progress}
        color={"#6200ee"}
        style={styles.progressBar}
      />
      {currentStep === 1 && (
        <Step1 onNext={handleNext} onPrevious={handlePrevious} />
      )}
      {currentStep === 2 && (
        <Step2 onNext={handleNext} onPrevious={handlePrevious} />
      )}
      {currentStep === 3 && (
        <Step3 onNext={handleNext} onPrevious={handlePrevious} />
      )}
    </SafeAreaView>
  );
};

type StepProps = {
  onNext: () => void;
  onPrevious: () => void;
};

const Step1 = ({ onNext, onPrevious }: StepProps) => {
  const [selectedValue, setSelectedValue] = useState("option1");

  return (
    <Step
      currentStep={1}
      totalSteps={3}
      onNext={onNext}
      onPrevious={onPrevious}
    >
      <Text>Step 1</Text>
      <RadioButton
        label="Option 1"
        value="option1"
        selectedValue={selectedValue}
        onValueChange={setSelectedValue}
      />
      <RadioButton
        label="Option 2"
        value="option2"
        selectedValue={selectedValue}
        onValueChange={setSelectedValue}
      />
    </Step>
  );
};

const Step2 = ({ onNext, onPrevious }: StepProps) => {
  // Add your form elements and logic here
  return (
    <Step
      currentStep={2}
      totalSteps={3}
      onNext={onNext}
      onPrevious={onPrevious}
    >
      <Text>Step 2</Text>
      {/* Your form elements */}
    </Step>
  );
};

const Step3 = ({ onNext, onPrevious }: StepProps) => {
  // Add your form elements and logic here
  return (
    <Step
      currentStep={3}
      totalSteps={3}
      onNext={onNext}
      onPrevious={onPrevious}
    >
      <Text>Step 3</Text>
      {/* Your form elements */}
    </Step>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 40,
    textAlign: "center",
  },
  progressBar: {
    height: 2,
  },
});
