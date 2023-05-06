import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ProgressBar from '../../shared/progress-bar/progress-bar';
import { RadioButton } from '../../shared/radio/radio';
import { SafeAreaView } from 'react-native-safe-area-context';

export const FormSteps = () => {
  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const [steps, setSteps] = useState([
    {
      id: 1,
      name: 'Distance',
      active: true,
      component: (
        <StepDistance onNext={handleNext} onPrevious={handlePrevious} />
      ),
    },
  ]);

  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress((currentStep / 3) * 100);
  }, [currentStep]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🚀 Créer une trace</Text>

      <View style={styles.stepsContainer}>
        {steps.map((step) => (
          <View key={step.id} style={styles.stepContainer}>

      <Text style={styles.title}>📏 On pars sur quelle distance ?</Text>
      <ProgressBar progress={progress} color='violet' height={2} />
    </SafeAreaView>
  );
};

type StepProps = {
  onNext: () => void;
  onPrevious: () => void;
};

const Step = ({ step }: { steps: Step }) => {
  return <View style={styles.stepContainer}>{step.component}</View>;
};

const StepDistance = ({ onNext, onPrevious }: StepProps) => {
  const [selectedValue, setSelectedValue] = useState('option1');

  return (
    <View>
      <Text>Step 1</Text>
      <RadioButton
        label='Option 1'
        value='option1'
        selectedValue={selectedValue}
        onValueChange={setSelectedValue}
      />
      <RadioButton
        label='Option 2'
        value='option2'
        selectedValue={selectedValue}
        onValueChange={setSelectedValue}
      />
    </View>
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

const Footer = ({ onNext, onPrevious }: StepProps) => {
  return (
    <View>
      {currentStep > 1 && (
        <Button onPress={onPrevious} title='Previous' color='#6200ee' />
      )}
      {currentStep < totalSteps ? (
        <Button onPress={onNext} title='Next' color='#6200ee' />
      ) : (
        <Button onPress={onNext} title='Create trace' color='#6200ee' />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 40,
    textAlign: 'center',
  },
  progressBar: {
    height: 2,
  },
});
