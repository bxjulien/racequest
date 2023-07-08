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

export default function RegisterScreen() {
  const router = useRouter();

  const { theme } = useThemeContext();
  const { user, session, signUpLoading, signUpError, signUpWithPassword } =
    useAuthContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user && session) return router.push('/(tabs)/user');
  }, [user, session]);

  const handleRegister = async () => {
    signUpWithPassword({ email, password });
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

        <Button onPress={handleRegister} loading={signUpLoading}>
          Créer mon compte
        </Button>

        {signUpError && <RQText>{signUpError.message}</RQText>}
      </View>
      <AuthProviders />
      <AuthSwitch goTo='/(auth)/login' />
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
