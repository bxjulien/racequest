import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RQText } from '../../components/shared/text/text';
import { useAuthContext } from '../../shared/contexts/auth.context';
import { useRouter } from 'expo-router';

export default function UserScreen() {
  const router = useRouter();
  const { session, user } = useAuthContext();

  useEffect(() => {
    if (!session || !user) return router.push('/(auth)/login');
  }, []);

  return (
    <SafeAreaView>
      <RQText>user</RQText>
    </SafeAreaView>
  );
}
