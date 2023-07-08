import { StyleSheet, View } from 'react-native';

import { FontSize } from '../../../shared/enums/font-size.enum';
import { RQText } from '../../shared/text/text';

export default function CreatedRaces() {
  return (
    <View style={styles.container}>
      <RQText style={styles.title} size={FontSize.xxxl}>
        Les courses dont vous êtes l'organisateur
      </RQText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  title: {},
});
