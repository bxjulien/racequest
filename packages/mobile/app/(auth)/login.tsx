import React, { useEffect, useState } from 'react';

import Button from '../../components/shared/button/button';
import InputText from '../../components/shared/input/input-text';
import { RQText } from '../../components/shared/text/text';
import { SafeAreaView } from 'react-native';
import { useAuthContext } from '../../shared/contexts/auth.context';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const { user, session, signInLoading, signInError, signInWithPassword } =
    useAuthContext();

  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user && session) return router.push('/(tabs)/user');
  }, [user, session]);

  const handleLogin = async () => {
    signInWithPassword({ email, password });
  };

  if (signInLoading) return <RQText>Loading...</RQText>;

  return (
    <SafeAreaView style={{ backgroundColor: 'black' }}>
      <InputText
        placeholder='Email'
        value={email}
        onChange={(text) => setEmail(text)}
      />
      <InputText
        placeholder='Password'
        value={password}
        onChange={(text) => setPassword(text)}
      />
      <Button onPress={handleLogin}>login</Button>
      <Button onPress={() => router.push('/(auth)/register')}>
        go to register
      </Button>
      {signInError && <RQText>{signInError.message}</RQText>}
    </SafeAreaView>
  );
}
