import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { CreateTraceStep } from '../../../shared/types/create-trace-step';
import ProgressBar from '../progress-bar/progress-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { RQText } from '../text/text';
import { FontSize } from '../../../shared/enums/font-size.enum';
import { useThemeContext } from '../../../shared/contexts/theme.context';

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
  const { theme } = useThemeContext();
  const {
    title: stepTitle,
    headerComponent,
    subtitle,
    component,
    footer,
  } = steps[activeStepIndex];
  const progressPercentage = (100 / steps.length) * (activeStepIndex + 1);

  return (
    <SafeAreaView style={[styles.container, style]}>
      <View>
        <RQText style={styles.title} bold size={FontSize.xxxxx}>
          {title}
        </RQText>
        {withProgressBar && (
          <ProgressBar
            progress={progressPercentage}
            color={theme.cta.primary}
            backgroundColor={theme.bg.neutral}
          />
        )}
      </View>

      <RQText style={styles.stepTitle} bold size={FontSize.xxxl}>{stepTitle}</RQText>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {headerComponent && headerComponent}

          {subtitle && <RQText style={styles.stepSubtitle} color={theme.text.secondary}>{subtitle}</RQText>}

          {component && component}
        </View>

        {footer && footer}
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
    textAlign: 'center',
    paddingVertical: 20,
  },
  stepTitle: {
    marginVertical: 20,
  },
  content: {
    flex: 1,
  },
  stepSubtitle: {
    fontSize: FontSize.l,
    marginBottom: 20,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
});
