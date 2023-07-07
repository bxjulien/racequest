import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import supabase from '../../lib/supabase/supabase.lib';
import InputText from '../../components/shared/input/input-text';
import Button from '../../components/shared/button/button';
import { RQText } from '../../components/shared/text/text';
import { useRouter } from 'expo-router';
import { useAuthContext } from '../../shared/contexts/auth.context';

export default function LoginScreen() {
  const { signInLoading, signInError, signInWithPassword } = useAuthContext();

  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
