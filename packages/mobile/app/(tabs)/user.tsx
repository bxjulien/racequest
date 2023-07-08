import React, { useEffect } from 'react';
import { Redirect, useRouter } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';

import Button from '../../components/shared/button/button';
import { ColorType } from '../../shared/enums/color-type.enum';
import CreatedRaces from '../../components/features/user/created-races';
import { FontSize } from '../../shared/enums/font-size.enum';
import { RQText } from '../../components/shared/text/text';
import { useAuthContext } from '../../shared/contexts/auth.context';

export default function UserScreen() {
  const router = useRouter();
  const { user, session, userLoading, userError, logout } = useAuthContext();

  if (!userLoading && (!user || !session))
    return <Redirect href='/(auth)/login' />;

  if (!user || userError)
    return <RQText>Erreur lors de la récupération de votre compte.</RQText>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <RQText size={FontSize.xxxxxx} bold>
        {user.username}
      </RQText>

      <CreatedRaces />

      <Button onPress={logout} type={ColorType.Danger}>
        Se déconnecter
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
});
