import { StyleSheet, View } from 'react-native';

import Button from '../button/button';
import React from 'react';

export default function FormStepsFooter({
  goNext,
  canGoNext = true,
  goBack,
  canGoBack = true,
}: {
  goNext: () => void;
  canGoNext?: boolean;
  goBack: () => void;
  canGoBack: boolean;
}) {
  return (
    <View style={styles.footer}>
      <Button
        title='Retour'
        style={styles.backButton}
        onPress={goBack}
        disabled={!canGoBack}
      />
      <Button
        style={styles.nextButton}
        title='Continuer'
        onPress={goNext}
        disabled={!canGoNext}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    gap: 10,
  },
  backButton: {
    flex: 0.25,
  },
  nextButton: {
    flex: 1,
    height: 80,
  },
});
