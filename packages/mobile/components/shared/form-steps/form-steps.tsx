import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ProgressBar from '../progress-bar/progress-bar';

type FormStepsProps = {
	title: string;
	withProgressBar?: boolean;
	steps: Step[];
	activeStep: number;
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
                                  }: FormStepsProps) {
	const progress = (activeStep / steps.length) * 100;

	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.title}>{title}</Text>
				{withProgressBar && (
					<ProgressBar progress={progress} color="violet" height={2}/>
				)}
				{steps[activeStep].title && (
					<Text style={styles.stepTitle}>{steps[activeStep].title}</Text>
				)}
			</View>

			{steps[activeStep].component}

			{steps[activeStep].footer}
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
		paddingVertical: 20,
	},
	stepTitle: {
		fontSize: 22,
		fontWeight: 'bold',
		marginTop: 40,
	},
});
