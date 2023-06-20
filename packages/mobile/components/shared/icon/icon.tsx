import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';

import { IconType } from '../../../shared/enums/IconType.enum';
import React from 'react';
import { Text } from 'react-native';

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
}: {
  name: any;
  type?: string;
  size?: number;
  color?: string;
}) {
  const IconComponent = ICON_COMPONENTS[type];

  if (!IconComponent) return <Text>Invalid icon type: {type}</Text>;

  return <IconComponent name={name} size={size} color={color} />;
}
