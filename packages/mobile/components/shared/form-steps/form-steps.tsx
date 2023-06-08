import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { CreateTraceStep } from '../../../shared/types/create-trace-step';
import ProgressBar from '../progress-bar/progress-bar';
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
  const progressPercentage = (100 / steps.length) * (activeStepIndex + 1);

  return (
    <SafeAreaView style={[style, styles.container]}>
      <View>
        <Text style={styles.title}>{title}</Text>
        {withProgressBar && (
          <ProgressBar
            progress={progressPercentage}
            color='#6200ee'
            height={2}
          />
        )}
      </View>

      <Text style={styles.stepTitle}>{steps[activeStepIndex].title}</Text>

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {steps[activeStepIndex].headerComponent &&
            steps[activeStepIndex].headerComponent}

          {steps[activeStepIndex].subtitle && (
            <Text style={styles.stepSubtitle}>
              {steps[activeStepIndex].subtitle}
            </Text>
          )}

          {steps[activeStepIndex].component && steps[activeStepIndex].component}
        </View>

        {steps[activeStepIndex].footer && steps[activeStepIndex].footer}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
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
  content: {
    flex: 1,
  },
  stepSubtitle: {
    fontSize: 18,
    color: 'grey',
    marginBottom: 20,
  },
});
