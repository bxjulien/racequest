import { StyleSheet, Text, View } from 'react-native';
import { useCallback, useRef, useState } from 'react';

import ProgressBar from '../progress-bar/progress-bar';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

type FormStepsProps = {
  title: string;
  withProgressBar?: boolean;
  steps: Step[];
  activeStep: number;
  style?: any;
};

type Step = {
  id: number;
  title?: string;
  component: React.ReactNode;
  footer: React.ReactNode;
};

export default function FormSteps({
  title,
  withProgressBar = true,
  steps,
  activeStep,
  style,
}: FormStepsProps) {
  const progress = (activeStep / steps.length) * 100;

  return (
    <View style={[style, styles.container]}>
      <SafeAreaView>
        <View>
          <Text style={styles.title}>{title}</Text>
          {withProgressBar && (
            <ProgressBar progress={progress} color='#6200ee' height={2} />
          )}
        </View>

        {steps[activeStep].component}
      </SafeAreaView>

      {steps[activeStep].footer && <View>{steps[activeStep].footer}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 20,
  },
});
