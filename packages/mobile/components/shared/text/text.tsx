import { Text, TextStyle } from 'react-native';

import { FontSize } from '../../../shared/enums/font-size.enum';
import { useThemeContext } from '../../../shared/contexts/theme.context';

export const RQText = ({
  children,
  style,
  size = FontSize.m,
  bold,
  color,
  center,
}: {
  children?: React.ReactNode;
  style?: TextStyle;
  size?: number;
  bold?: boolean;
  color?: string;
  center?: boolean;
}) => {
  const { theme } = useThemeContext();

  return (
    <Text
      style={[
        {
          fontSize: size,
          fontWeight: bold ? 'bold' : 'normal',
          color: color || theme.text.primary,
          textAlign: center ? 'center' : 'left',
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};
