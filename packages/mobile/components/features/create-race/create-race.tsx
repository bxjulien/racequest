import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import {
  createRace,
  getAutoTracks,
} from '../../../shared/services/api.service';

import { CreateRaceForm } from '../../../shared/types/create-race-form';
import CreateTraceDistance from './distance/create-trace-distance';
import CreateTraceDuration from './duration/create-trace-duration';
import CreateTraceStartingPoint from './starting-point/starting-point';
import { CreateTraceStep } from '../../../shared/types/create-trace-step';
import CreateTraceSubmit from './submit/submit';
import FormSteps from '../../shared/form-steps/form-steps';
import FormStepsFooter from '../../shared/form-steps/form-steps-footer';
import { FormatType } from '../../../shared/enums/FormatType.enum';
import { Race } from '../../../shared/types/race.type';
import { SearchPlace } from './starting-point/search-place/search-place';
import SelectTrack from './select-track/select-track';
import Success from './submit/success/success';
import { useLocationContext } from '../../../shared/contexts/location.context';
import { useMutation } from 'react-query';
import { useRouter } from 'expo-router';

export default function CreateRace() {
  const router = useRouter();
  const { location, address } = useLocationContext();

  const getAutoTracksMutation = useMutation(
    ({
      longitude,
      latitude,
      distance,
    }: {
      longitude: number;
      latitude: number;
      distance: number;
    }) => getAutoTracks(longitude, latitude, distance)
  );

  const createRaceMutation = useMutation(createRace, {
    onSuccess: (race) => {
      setCreatedRace(race);
      goNext();
    },
  });

  const [formData, setFormData] = useState<CreateRaceForm>({
    format: FormatType.Short,
    startingPoint: {
      address: address,
      longitude: location?.coords.longitude || 0,
      latitude: location?.coords.latitude || 0,
    },
    track: null,
    closingIn: 30,
    name: 'Course de Julien',
  });

  const [createdRace, setCreatedRace] = useState<Race | null>(null);

  const goNext = () => {
    if (currentStepIndex === steps.length - 1) return;
    setCurrentStepIndex(currentStepIndex + 1);
  };

  const goBack = () => {
    if (currentStepIndex === 0) return router.push('/(tabs)/home');
    setCurrentStepIndex(currentStepIndex - 1);
  };

  const onGetAutoTracks = () => {
    const longitude = formData.startingPoint?.longitude;
    const latitude = formData.startingPoint?.latitude;

    if (!longitude || !latitude) return;

    // todo refacto
    const distance =
      formData.format === FormatType.Short
        ? 4
        : formData.format === FormatType.Medium
        ? 8
        : 14;

    getAutoTracksMutation.mutate({
      longitude,
      latitude,
      distance,
    });

    goNext();
  };

  const steps: CreateTraceStep[] = [
    {
      id: 1,
      title: 'On pars sur quel format ?',
      component: (
        <CreateTraceDistance
          format={formData.format}
          setFormat={(format) => setFormData({ ...formData, format: format })}
        />
      ),
      footer: <FormStepsFooter goNext={goNext} goBack={goBack} />,
    },
    {
      id: 2,
      title: "On démarre d'où ?",
      subtitle:
        'Ou appuyez longuement sur la carte pour choisir un point de départ',
      headerComponent: (
        <SearchPlace
          value={formData.startingPoint}
          setValue={(startingPoint) =>
            setFormData({ ...formData, startingPoint })
          }
        />
      ),
      component: (
        <CreateTraceStartingPoint
          value={formData.startingPoint}
          setValue={(startingPoint) => {
            setFormData({ ...formData, startingPoint });
          }}
        />
      ),
      footer: (
        <FormStepsFooter
          canGoNext={Boolean(
            formData.startingPoint?.longitude &&
              formData.startingPoint?.latitude &&
              formData.format
          )}
          goNext={onGetAutoTracks}
          goBack={goBack}
        />
      ),
    },
    {
      id: 3,
      title: 'On pars sur quel parcours ?',
      component: (
        <SelectTrack
          track={formData.track}
          setTrack={(track) => setFormData({ ...formData, track })}
          loading={getAutoTracksMutation.isLoading}
          error={getAutoTracksMutation.isError}
          tracks={getAutoTracksMutation.data}
        />
      ),
      footer: (
        <FormStepsFooter
          goNext={goNext}
          canGoNext={Boolean(formData.track)}
          goBack={goBack}
        />
      ),
    },
    {
      id: 4,
      title: 'On clôture dans combien de jours ?',
      subtitle:
        'Après ce délai, le classement de la course sera figé et les recompenses seront distribuées.',
      component: (
        <CreateTraceDuration
          value={formData.closingIn}
          setValue={(closingIn) => setFormData({ ...formData, closingIn })}
        />
      ),
      footer: (
        <FormStepsFooter
          goNext={goNext}
          canGoNext={Boolean(formData.closingIn)}
          goBack={goBack}
        />
      ),
    },
    {
      id: 5,
      title: 'Tout est prêt !',
      subtitle:
        "Il ne reste plus qu'à créer la course et partir à l'aventure !",
      component: (
        <CreateTraceSubmit
          track={formData.track}
          name={formData.name}
          setName={(name) => setFormData({ ...formData, name })}
        />
      ),
      footer: (
        <FormStepsFooter
          goNext={() => {
            createRaceMutation.mutate(formData);
          }}
          goBack={goBack}
          goNextTitle={
            createRaceMutation.isLoading
              ? 'Création en cours...'
              : 'Créer la course'
          }
          canGoNext={!createRaceMutation.isLoading}
          canGoBack={!createRaceMutation.isLoading}
        />
      ),
    },
    {
      id: 6,
      title: 'Course créée !',
      subtitle:
        'Tous les utilisateurs Race Quest peuvent maintenant participer à votre course.',
      component: <Success />,
      footer: (
        <FormStepsFooter
          goNext={() => {
            router.push(`/(races)/${createdRace?.id}`);
          }}
          showGoBack={false}
          goNextTitle={'Consulter la course'}
          canGoBack={false}
        />
      ),
    },
  ];

  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  return (
    <FormSteps
      title='🚀 Créer une course'
      steps={steps}
      activeStepIndex={currentStepIndex}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
});
