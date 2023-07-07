import { Pressable, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';

import AuthProviders from '../../components/features/auth/providers';
import Button from '../../components/shared/button/button';
import { FontSize } from '../../shared/enums/font-size.enum';
import InputText from '../../components/shared/input/input-text';
import { RQText } from '../../components/shared/text/text';
import { useAuthContext } from '../../shared/contexts/auth.context';
import { useRouter } from 'expo-router';
import { useThemeContext } from '../../shared/contexts/theme.context';

export default function RegisterScreen() {
  const router = useRouter();

  const { theme } = useThemeContext();
  const { signUpLoading, signUpError, signUpSuccess, signUpWithPassword } =
    useAuthContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (signUpLoading) return <RQText>Loading...</RQText>;

  const handleRegister = async () => {
    signUpWithPassword({ email, password });
  };

  return (
    <View style={styles.container}>
      <View>
        <RQText size={FontSize.xxxxxx} bold style={styles.title}>
          Prêt à vous lancer ?
        </RQText>
        <RQText
          size={FontSize.xxxx}
          style={styles.title}
          color={theme.text.secondary}
        >
          Créez votre compte
        </RQText>
      </View>

      <View style={styles.inputs}>
        <InputText
          placeholder='Email'
          value={email}
          onChange={(text) => setEmail(text)}
        />
        <InputText
          placeholder='Mot de passe'
          value={password}
          onChange={(text) => setPassword(text)}
        />
        <Button onPress={handleRegister}>Créer mon compte</Button>
      </View>

      <AuthProviders />

      <Pressable
        style={{ flexDirection: 'row', justifyContent: 'center' }}
        onPress={() => router.push('/(auth)/login')}
      >
        <RQText>Vous avez déjà un compte ?</RQText>
        <RQText color={theme.text.ternary}> Se connecter</RQText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 20,
    justifyContent: 'space-between',
  },
  title: {
    textAlign: 'center',
  },
  inputs: {
    gap: 30,
  },
});
