import { StyleSheet, Text, View, ViewStyle } from 'react-native';

import { FontSize } from '../../../../shared/enums/font-size.enum';
import { RQText } from '../../text/text';
import { Race } from '../../../../shared/types/race.type';
import React from 'react';
import { Track } from '../../../../shared/types/track.type';
import { getVerboseDate } from '../../../../shared/utils/date.utils';
import { useThemeContext } from '../../../../shared/contexts/theme.context';

export const TrackMacroLight = ({
  track,
  race,
  closingIn,
}: {
  track: Track;
  race?: Race;
  closingIn?: number;
}) => {
  const { theme } = useThemeContext();

  console.log(closingIn);

  return (
    <View style={styles.infos}>
      <View>
        <RQText style={styles.infoTitle} color={theme.text.secondary}>
          Distance
        </RQText>
        <RQText style={styles.infoValue}>{track.distance}km</RQText>
      </View>

      <View>
        <RQText style={styles.infoTitle} color={theme.text.secondary}>
          Dénivelé
        </RQText>
        <RQText style={styles.infoValue}>{track.elevation.total}m</RQText>
      </View>

      {race && race.events && (
        <View>
          <RQText style={styles.infoTitle} color={theme.text.secondary}>
            Se termine
          </RQText>
          <RQText style={styles.infoValue}>
            {!closingIn
              ? getVerboseDate(
                  new Date(race.events[race.events?.length - 1]?.endDate)
                )
              : `Dans ${closingIn} jours`}
          </RQText>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  infos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoTitle: {
    fontSize: FontSize.s,
  },
  infoValue: {
    fontSize: FontSize.l,
  },
});
