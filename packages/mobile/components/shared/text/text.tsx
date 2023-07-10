import { Text, TextStyle } from 'react-native';

import { useThemeContext } from '../../../shared/contexts/theme.context';
import { FontSize } from '../../../shared/enums/font-size.enum';

export const RQText = ({
  children,
  style,
  size = FontSize.m,
  bold,
  color,
}: {
  children?: React.ReactNode;
  style?: TextStyle;
  size?: number;
  bold?: boolean;
  color?: string;
}) => {
  const { theme } = useThemeContext();

  return (
    <Text
      style={[
        {
          fontSize: size,
          fontWeight: bold ? 'bold' : 'normal',
          color: color || theme.text.primary,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};
