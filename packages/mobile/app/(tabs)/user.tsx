import React, { useEffect } from 'react';

import Button from '../../components/shared/button/button';
import { RQText } from '../../components/shared/text/text';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthContext } from '../../shared/contexts/auth.context';
import { useRouter } from 'expo-router';

export default function UserScreen() {
  const router = useRouter();
  const { session, user, logout } = useAuthContext();

  useEffect(() => {
    if (!session || !user) return router.push('/(tabs)/home');
  }, [session, user]);

  return (
    <SafeAreaView>
      <RQText>user</RQText>

      <Button onPress={logout}>logout</Button>
    </SafeAreaView>
  );
}
