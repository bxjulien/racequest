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
        color='orange'
      />
      <Button
        style={styles.nextButton}
        color='#6200ee'
        title='Continuer'
        onPress={goNext}
        disabled={!canGoNext}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingVertical: 10,
    flexDirection: 'row',
    gap: 10,
  },
  backButton: {
    flex: 0.25,
    color: 'red',
  },
  nextButton: {
    flex: 1,
    height: 80,
  },
});
