import { Tabs } from 'expo-router';

export default () => {
  return (
    <Tabs>
      <Tabs.Screen
        name='home'
        options={{
          tabBarLabel: 'Accueil',
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name='map'
        options={{
          tabBarLabel: 'Explorer',
          headerShown: false,
        }}
      />
    </Tabs>
  );
};
