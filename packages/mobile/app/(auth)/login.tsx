import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import AuthProviders from '../../components/features/auth/providers';
import AuthSwitch from '../../components/features/auth/switch';
import Button from '../../components/shared/button/button';
import { FontSize } from '../../shared/enums/font-size.enum';
import InputText from '../../components/shared/input/input-text';
import { RQText } from '../../components/shared/text/text';
import { useAuthContext } from '../../shared/contexts/auth.context';
import { useRouter } from 'expo-router';
import { useThemeContext } from '../../shared/contexts/theme.context';

export default function LoginScreen() {
  const { theme } = useThemeContext();
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

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={{ flex: 1 }}
      keyboardShouldPersistTaps='handled'
      keyboardDismissMode='on-drag'
    >
      <View>
        <RQText size={FontSize.xxxxxx} bold style={styles.title}>
          Vous revoilà !
        </RQText>
        <RQText
          size={FontSize.xxxx}
          style={styles.title}
          color={theme.text.secondary}
        >
          Conectez-vous à votre compte
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

        <Button onPress={handleLogin} loading={signInLoading}>
          Connexion
        </Button>

        {signInError && <RQText>{signInError.message}</RQText>}
      </View>
      <AuthProviders />
      <AuthSwitch goTo='/(auth)/register' />
    </ScrollView>
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
