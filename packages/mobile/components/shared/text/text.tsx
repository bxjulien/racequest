import { Text, TextStyle } from 'react-native';

import { useThemeContext } from '../../../shared/contexts/theme.context';

export const RQText = ({
  children,
  style,
}: {
  children: string | number;
  style: TextStyle;
}) => {
  const { theme } = useThemeContext();

  return (
    <Text
      style={[
        {
          color: theme.colors.text.primary,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};
