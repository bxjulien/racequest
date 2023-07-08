import Icon from '../../components/shared/icon/icon';
import { IconType } from '../../shared/enums/IconType.enum';
import { Tabs } from 'expo-router';
import { useThemeContext } from '../../shared/contexts/theme.context';

export default () => {
  const { theme } = useThemeContext();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.bg.primary,
          borderTopColor: theme.bg.neutral,
        },
        tabBarActiveTintColor: theme.cta.primary,
        tabBarInactiveTintColor: theme.cta.disabled,
      }}
      sceneContainerStyle={{
        backgroundColor: theme.bg.primary,
      }}
    >
      <Tabs.Screen
        name='home'
        options={{
          tabBarLabel: 'Accueil',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name='home' color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name='map'
        options={{
          tabBarLabel: 'Explorer',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name='map' color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name='user'
        options={{
          tabBarLabel: 'Compte',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon
              name='user'
              color={color}
              size={size}
              type={IconType.FontAwesome}
            />
          ),
        }}
      />
    </Tabs>
  );
};
