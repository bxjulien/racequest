import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { Text, View, ViewStyle } from 'react-native';

import { IconType } from '../../../shared/enums/IconType.enum';
import React from 'react';

const ICON_COMPONENTS: any = {
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
};

export default function Icon({
  name,
  type = IconType.MaterialIcons,
  size = 24,
  color = 'black',
  style,
}: {
  name: any;
  type?: string;
  size?: number;
  color?: string;
  style?: ViewStyle;
}) {
  const IconComponent = ICON_COMPONENTS[type];

  if (!IconComponent) return <Text>Invalid icon type: {type}</Text>;

  return (
    <View style={style}>
      <IconComponent name={name} size={size} color={color} />
    </View>
  );
}
