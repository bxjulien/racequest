import React, { useEffect } from 'react';

import Button from '../../components/shared/button/button';
import { ColorType } from '../../shared/enums/color-type.enum';
import { RQText } from '../../components/shared/text/text';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthContext } from '../../shared/contexts/auth.context';
import { useRouter } from 'expo-router';

export default function UserScreen() {
  const router = useRouter();
  const { user, session, logout } = useAuthContext();

  useEffect(() => {
    if (!user || !session) router.push('/(auth)/login');
  }, [user, session]);

  return (
    <SafeAreaView>
      <RQText>user</RQText>

      <Button onPress={logout} type={ColorType.Danger}>
        Se déconnecter
      </Button>
    </SafeAreaView>
  );
}
