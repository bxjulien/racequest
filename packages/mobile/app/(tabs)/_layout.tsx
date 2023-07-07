import Icon from '../../components/shared/icon/icon';
import { Tabs } from 'expo-router';
import { useThemeContext } from '../../shared/contexts/theme.context';
import { IconType } from '../../shared/enums/IconType.enum';

export default () => {
  const { theme } = useThemeContext();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.bg.primary,
        },
        tabBarActiveTintColor: theme.cta.primary,
        tabBarInactiveTintColor: theme.cta.disabled,
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
            <Icon name='user' color={color} size={size} type={IconType.FontAwesome} />
          ),
        }}
      />
    </Tabs>
  );
};
