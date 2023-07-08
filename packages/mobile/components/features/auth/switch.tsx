import { Pressable } from 'react-native';
import { RQText } from '../../shared/text/text';
import { useRouter } from 'expo-router';
import { useThemeContext } from '../../../shared/contexts/theme.context';

export default function AuthSwitch({
  goTo,
  text,
  actionText,
}: {
  goTo: string;
  text: string;
  actionText: string;
}): JSX.Element {
  const router = useRouter();
  const { theme } = useThemeContext();

  return (
    <Pressable
      style={{ flexDirection: 'row', justifyContent: 'center' }}
      onPress={() => router.push(goTo)}
    >
      <RQText>{text}</RQText>
      <RQText color={theme.text.ternary}>{` ${actionText}`}</RQText>
    </Pressable>
  );
}
