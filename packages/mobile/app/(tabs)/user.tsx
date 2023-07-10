import { Image, ScrollView, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';

import Button from '../../components/shared/button/button';
import { ColorType } from '../../shared/enums/color-type.enum';
import { FontSize } from '../../shared/enums/font-size.enum';
import { RQText } from '../../components/shared/text/text';
import { RaceList } from '../../components/shared/race-list/race-list';
import { Redirect } from 'expo-router';
import { useAuthContext } from '../../shared/contexts/auth.context';

export default function UserScreen() {
  const { user, session, userLoading, userError, logout } = useAuthContext();

  if (!userLoading && (!user || !session))
    return <Redirect href='/(auth)/login' />;

  if (!user || userError)
    return <RQText>Erreur lors de la récupération de votre compte.</RQText>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Image
          source={{ uri: user.pp }}
          style={{ width: 50, height: 50, borderRadius: 50 }}
        />
        <RQText size={FontSize.xxxxxx} bold>
          {user.username}
        </RQText>
      </View>

      <RaceList
        title="Les courses dont vous êtes l'organisateur"
        races={user.createdRaces}
      />

      <Button onPress={logout} type={ColorType.Danger}>
        Se déconnecter
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
  },
});
