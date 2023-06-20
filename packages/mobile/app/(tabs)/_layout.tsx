import Icon from '../../components/shared/icon/icon';
import { Tabs } from 'expo-router';

export default () => {
  return (
    <Tabs>
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
    </Tabs>
  );
};
