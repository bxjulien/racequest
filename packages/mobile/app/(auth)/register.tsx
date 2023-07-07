import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import supabase from '../../lib/supabase/supabase.lib';
import InputText from '../../components/shared/input/input-text';
import Button from '../../components/shared/button/button';
import { RQText } from '../../components/shared/text/text';
import { useRouter } from 'expo-router';
import { useAuthContext } from '../../shared/contexts/auth.context';

export default function RegisterScreen() {
  const router = useRouter();

  const { signUpLoading, signUpError, signUpSuccess, signUpWithPassword } =
    useAuthContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (signUpLoading) return <RQText>Loading...</RQText>;

  const handleRegister = async () => {
    signUpWithPassword({ email, password });
  };

  return (
    <View style={{ backgroundColor: 'black' }}>
      <RQText>Register</RQText>
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
      <Button onPress={handleRegister}>Register</Button>
      <Button onPress={() => router.push('/(auth)/login')}>go to login</Button>
      {signUpError && <RQText>{signUpError.message}</RQText>}
      {signUpSuccess && <RQText>Success! confirm email</RQText>}
    </View>
  );
}
