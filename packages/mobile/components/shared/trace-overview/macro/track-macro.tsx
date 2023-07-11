import { StyleSheet, Text, View, ViewStyle } from 'react-native';

import { FontSize } from '../../../../shared/enums/font-size.enum';
import Icon from '../../icon/icon';
import { IconType } from '../../../../shared/enums/IconType.enum';
import { RQText } from '../../text/text';
import { Race } from '../../../../shared/types/race.type';
import React from 'react';
import { Track } from '../../../../shared/types/track.type';
import { getVerboseDate } from '../../../../shared/utils/date.utils';
import { useThemeContext } from '../../../../shared/contexts/theme.context';

export const TrackMacro = ({ track, race }: { track: Track; race?: Race }) => {
  const { theme } = useThemeContext();

  const macros = [
    {
      id: 1,
      title: 'Distance',
      value: `${track.distance}km`,
      icon: 'map-marker-distance',
      show: true,
    },
    {
      id: 2,
      title: 'Dénivelé',
      value: `${track.elevation.total}m`,
      icon: 'elevation-rise',
      show: true,
    },
    {
      id: 3,
      title: 'Se termine',
      value:
        race && race.events
          ? getVerboseDate(
              new Date(race.events[race.events?.length - 1]?.endDate)
            )
          : null,
      icon: 'calendar-clock',
      show: race && race.events,
    },
  ];

  return (
    <View style={styles.container}>
      {macros
        .filter((m) => m.show)
        .map((macro) => (
          <View
            key={macro.id}
            style={[
              styles.info,
              {
                backgroundColor: theme.bg[400],
              },
            ]}
          >
            <Icon
              style={{
                padding: 15,
                backgroundColor: theme.bg[500],
                borderRadius: 20,
              }}
              name={macro.icon}
              size={30}
              color={theme.text.primary}
              type={IconType.MaterialCommunityIcons}
            />
            <View>
              <RQText style={styles.infoTitle}>{macro.title}</RQText>
              <RQText bold size={FontSize.xl}>
                {macro.value}
              </RQText>
            </View>
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 20,
    gap: 15,
    flexGrow: 1,
  },
  infoTitle: {
    fontSize: FontSize.s,
  },
});
