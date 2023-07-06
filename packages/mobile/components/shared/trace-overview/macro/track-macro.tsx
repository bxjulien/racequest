import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Track } from '../../../../shared/types/track.type';
import { RQText } from '../../text/text';
import { FontSize } from '../../../../shared/enums/font-size.enum';
import { useThemeContext } from '../../../../shared/contexts/theme.context';

export const TrackMacro = ({ track }: { track: Track }) => {
  const { theme } = useThemeContext();

  return (
    <View style={styles.infos}>
      <View>
        <RQText style={styles.infoTitle} color={theme.text.secondary}>Distance</RQText>
        <RQText style={styles.infoValue}>{track.distance}km</RQText>
      </View>

      <View>
        <RQText style={styles.infoTitle} color={theme.text.secondary}>Dénivelé</RQText>
        <RQText style={styles.infoValue}>{track.elevation.total}m</RQText>
      </View>

      {/* {!withoutEndDate && <Closing trace={trace} />} */}
    </View>
  );
};

const styles = StyleSheet.create({
  infos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoTitle: {
    fontSize: FontSize.s
  },
  infoValue: {
    fontSize: FontSize.l,
  },
});
