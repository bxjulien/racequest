import { Race } from '../../../shared/types/race.type';
import { useRouter } from 'expo-router';
import { FontSize } from '../../../shared/enums/font-size.enum';
import { FlatList, Pressable, StyleSheet, View, ViewStyle } from 'react-native';

import { RQText } from '../../shared/text/text';
import RaceOverview from '../../shared/trace-overview/race-overview';

const LEFT_MARGIN = 20;
const RACES_GAP = 20;
const RACE_WIDTH = 280;

export const RaceList = ({
  title,
  races,
  noDataMessage = 'no data',
}: {
  title?: string;
  races: Race[] | null | undefined;
  noDataMessage?: string;
}) => {
  if (!races) return <RQText>{noDataMessage}</RQText>;
  return (
    <View>
      {title && (
        <RQText style={styles.title} size={FontSize.xxxx} bold>
          {title}
        </RQText>
      )}

      <FlatList
        data={races}
        renderItem={({ item, index }) => (
          <RaceItem
            race={item}
            style={{ marginLeft: index === 0 ? LEFT_MARGIN : 0 }}
          />
        )}
        contentContainerStyle={styles.contentContainerStyle}
        snapToInterval={RACE_WIDTH + RACES_GAP}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const RaceItem = ({ race, style }: { race: Race; style: ViewStyle }) => {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.push(`/(races)/${race.id}`)}>
      <RaceOverview
        race={race}
        track={race.track}
        isMapInteractive={false}
        containerStyle={{ width: RACE_WIDTH, ...style }}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    gap: RACES_GAP,
    paddingRight: LEFT_MARGIN,
  },
  title: {
    marginLeft: LEFT_MARGIN,
    marginBottom: 10,
  },
});
