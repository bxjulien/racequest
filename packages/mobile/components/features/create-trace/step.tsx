import React from "react";
import { View, StyleSheet, Button } from "react-native";

type StepProps = {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
};

export const Step = ({
  children,
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
}: StepProps) => {

  return (
    <View style={styles.container}>
      <View style={styles.content}>{children}</View>
      <View style={styles.footer}>

        <View style={styles.buttonContainer}>
          {currentStep > 1 && (
            <Button onPress={onPrevious} title="Previous" color="#6200ee" />
          )}
          {currentStep < totalSteps ? (
            <Button onPress={onNext}
              title="Next"
              color="#6200ee"
            />
          ) : (
            <Button onPress={onNext} title="Create trace" color="#6200ee" />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  footer: {
    padding: 0,
    backgroundColor: "#f5f5f5",
  },
  progressBar: {
    height: 2,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  formElement: {
    marginBottom: 20,
    width: "100%",
  },
  formLabel: {
    fontSize: 18,
    marginBottom: 10,
  },
});
