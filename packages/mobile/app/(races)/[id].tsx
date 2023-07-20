import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Dimensions, View } from 'react-native';
import { getRace, subscribeToRace } from '../../shared/services/api.service';
import { useEffect, useMemo, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMutation, useQuery } from 'react-query';

import Button from '../../components/shared/button/button';
import Chip from '../../components/shared/chip/chip';
import { FontSize } from '../../shared/enums/font-size.enum';
import MapTrack from '../../components/shared/map-track/map-track';
import { RQText } from '../../components/shared/text/text';
import { Race } from '../../shared/types/race.type';
import { RaceEvent } from '../../shared/types/race-event.type';
import RaceOverview from '../../components/shared/trace-overview/race-overview';
import { StyleSheet } from 'react-native';
import { TrackMacro } from '../../components/shared/trace-overview/macro/track-macro';
import { User } from '../../shared/types/user/user';
import { getShortDate } from '../../shared/utils/date.utils';
import { useAuthContext } from '../../shared/contexts/auth.context';
import { useThemeContext } from '../../shared/contexts/theme.context';

const SNAP_POINTS = ['35%', '70%'];

const useRace = (id: string) => {
  const [currentEvent, setCurrentEvent] = useState<RaceEvent | undefined>();

  const {
    data: race,
    isError,
    isLoading,
    refetch,
  } = useQuery<Race>(`race-${id}`, () => getRace(+id), {
    enabled: !!id,
    staleTime: 60000, // 1 minute
  });

  useEffect(() => {
    if (race) setCurrentEvent(race.events[race.events.length - 1]);
  }, [race]);

  return { race, currentEvent, isError, isLoading, refetch };
};

export default function RaceScreen({}): JSX.Element {
  const { id } = useLocalSearchParams();
  const { race, isError, isLoading, currentEvent } = useRace(id as string);

  const { user, session } = useAuthContext();
  const { theme } = useThemeContext();

  if (isLoading) return <RQText>Loading</RQText>;

  if (isError) return <RQText>Error</RQText>;

  if (race)
    return (
      <View style={styles.container}>
        <MapTrack track={race.track} height={Dimensions.get('window').height} />

        <BottomSheet
          snapPoints={SNAP_POINTS}
          handleIndicatorStyle={{ backgroundColor: theme.bg.neutral }}
          backgroundStyle={{ backgroundColor: theme.bg.primary }}
        >
          <BottomSheetScrollView
            contentContainerStyle={{
              gap: 20,
              paddingHorizontal: 10,
            }}
          >
            <RQText size={FontSize.xxxl} bold center>
              {race.name}
            </RQText>

            <TrackMacro track={race.track} race={race} event={currentEvent} />

            {currentEvent && (
              <View style={styles.contentContainer}>
                <RQText>Edition {currentEvent.editionCount} en cours</RQText>
                <RQText>
                  {getShortDate(new Date(currentEvent?.startDate))} -{' '}
                  {getShortDate(new Date(currentEvent?.endDate))}
                </RQText>
                <Subscription
                  user={user}
                  session={session}
                  currentEvent={currentEvent}
                />
              </View>
            )}
          </BottomSheetScrollView>
        </BottomSheet>
      </View>
    );

  return <RQText>Not found</RQText>;
}

const Subscription = ({
  currentEvent,
  user,
  session,
}: {
  currentEvent: RaceEvent | null;
  user: User | null;
  session: any;
}) => {
  const router = useRouter();

  if (!user)
    return (
      <Button
        onPress={() => {
          router.push('/(auth)/login');
        }}
      >
        S'inscrire
      </Button>
    );

  const [hasUserSubscribed, setHasUserSubscribed] = useState(
    user?.subscribedEvents?.some((r) => r.event.id === currentEvent?.id)
  );

  const subscribeToRaceMutation = useMutation(
    ({ eventId, accessToken }: { eventId: number; accessToken: string }) =>
      subscribeToRace(eventId, accessToken),
    {
      onSuccess: () => {
        setHasUserSubscribed(true);
      },
    }
  );

  if (hasUserSubscribed) return <HasSubscribed />;

  return (
    <Button
      loading={subscribeToRaceMutation.isLoading}
      onPress={() => {
        subscribeToRaceMutation.mutate({
          eventId: currentEvent!.id,
          accessToken: session.access_token,
        });
      }}
    >
      S'inscrire
    </Button>
  );
};

const HasSubscribed = () => {
  const { theme } = useThemeContext();

  return (
    <Chip>
      <View style={[styles.dot, { backgroundColor: theme.cta.success }]}></View>
      <RQText bold>Vous êtes inscrits</RQText>
    </Chip>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
  },
});
