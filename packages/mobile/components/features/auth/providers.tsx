import { StyleSheet, View } from 'react-native';

import Icon from '../../shared/icon/icon';
import { IconType } from '../../../shared/enums/IconType.enum';
import { RQText } from '../../shared/text/text';
import { useThemeContext } from '../../../shared/contexts/theme.context';

export default function AuthProviders() {
  const { theme } = useThemeContext();
  return (
    <View style={styles.container}>
      <View style={styles.intro}>
        <View
          style={[styles.line, { backgroundColor: theme.cta.disabled }]}
        ></View>
        <RQText>Ou continuez avec</RQText>
        <View
          style={[styles.line, { backgroundColor: theme.cta.disabled }]}
        ></View>
      </View>

      <View style={styles.providers}>
        <View style={[styles.provider, { borderColor: theme.cta.disabled }]}>
          <Icon
            name='google'
            color={theme.cta.ternary}
            size={40}
            type={IconType.FontAwesome}
          />
        </View>
        <View style={[styles.provider, { borderColor: theme.cta.disabled }]}>
          <Icon
            name='facebook'
            color={theme.cta.ternary}
            size={40}
            type={IconType.FontAwesome}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
    opacity: 0.4,
  },
  intro: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  line: {
    flex: 0.3,
    height: 1,
  },
  providers: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  provider: {
    alignItems: 'center',
    minWidth: 70,
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
  },
});
