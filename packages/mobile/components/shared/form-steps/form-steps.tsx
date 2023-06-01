import { StyleSheet, Text, View, ViewStyle } from 'react-native';

import { CreateTraceStep } from '../../../shared/types/create-trace-step';
import ProgressBar from '../progress-bar/progress-bar';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

type FormStepsProps = {
  title: string;
  withProgressBar?: boolean;
  steps: CreateTraceStep[];
  activeStepIndex: number;
  style?: ViewStyle;
};

export default function FormSteps({
  title,
  withProgressBar = true,
  steps,
  activeStepIndex,
  style,
}: FormStepsProps) {
  const progress = (activeStepIndex / steps.length) * 100;

  return (
    <SafeAreaView style={[style, styles.container]}>
      <View style={styles.content}>
        <View>
          <Text style={styles.title}>{title}</Text>
          {withProgressBar && (
            <ProgressBar progress={progress} color='#6200ee' height={2} />
          )}
        </View>

        <Text style={styles.stepTitle}>{steps[activeStepIndex].title}</Text>

        {steps[activeStepIndex].subtitle && (
          <Text style={styles.stepSubtitle}>
            {steps[activeStepIndex].subtitle}
          </Text>
        )}

        <ScrollView showsVerticalScrollIndicator={false}>
          {steps[activeStepIndex].component && steps[activeStepIndex].component}
        </ScrollView>
      </View>

      {steps[activeStepIndex].footer && steps[activeStepIndex].footer}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 20,
  },
  stepTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  stepSubtitle: {
    fontSize: 18,
    color: 'grey',
    marginBottom: 20,
  },
});
