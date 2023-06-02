import { StyleSheet, View } from "react-native";

import Button from "../button/button";
import React from "react";

export default function FormStepsFooter({
  goNext,
  canGoNext = true,
  goNextTitle = "Continuer",
  goBack,
  canGoBack = true,
  goBackTitle = "Retour",
}: {
  goNext: () => void;
  canGoNext?: boolean;
  goNextTitle?: string;
  goBack: () => void;
  canGoBack?: boolean;
  goBackTitle?: string;
}) {
  return (
    <View style={styles.footer}>
      <Button
        title={goBackTitle}
        style={styles.backButton}
        onPress={goBack}
        disabled={!canGoBack}
        color="orange"
      />
      <Button
        style={styles.nextButton}
        color="#6200ee"
        title={goNextTitle}
        onPress={goNext}
        disabled={!canGoNext}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingVertical: 10,
    flexDirection: "row",
    gap: 10,
  },
  backButton: {
    flex: 0.25,
    color: "red",
  },
  nextButton: {
    flex: 1,
    height: 80,
  },
});
