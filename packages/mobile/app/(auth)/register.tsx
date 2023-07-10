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
  const {
    user,
    session,
    signUpLoading,
    signUpError,
    signUpWithPassword,
    signUpSuccess,
  } = useAuthContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user && session) return router.push('/(tabs)/user');
  }, [user, session]);

  const handleRegister = async () => {
    signUpWithPassword({ email, password });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
      {signUpSuccess ? (
        <Success />
      ) : (
        <View style={styles.inputs}>
          {signUpError && (
            <RQText color={theme.cta.danger}>{signUpError.message}</RQText>
          )}

          <InputText
            placeholder='Email'
            value={email}
            onChange={(text) => setEmail(text)}
          />

          <InputText
            placeholder='Mot de passe'
            value={password}
            onChange={(text) => setPassword(text)}
            type='password'
          />

          <Button onPress={handleRegister} loading={signUpLoading}>
            Créer mon compte
          </Button>
        </View>
      )}

      {!signUpSuccess && (
        <View style={{ gap: 80 }}>
          <AuthProviders />
          <AuthSwitch
            goTo='/(auth)/login'
            text='Vous avez déjà un compte ?'
            actionText='Connectez-vous'
          />
        </View>
      )}
    </ScrollView>
  );
}

const Success = () => {
  const router = useRouter();
  const { theme } = useThemeContext();

  return (
    <View style={styles.inputs}>
      <RQText style={styles.success} size={FontSize.xxxl}>
        Compte créé avec succès ! 🏃‍♂️
      </RQText>
      <RQText color={theme.text.ternary} bold>
        Un email de confirmation vous a été envoyé. Vous devez confirmer votre
        adresse email avant de pouvoir vous connecter.
      </RQText>

      <Button onPress={() => router.push('/(auth)/login')}>
        J'ai confirmé mon adresse email !
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 80,
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 20,
  },
  title: {
    textAlign: 'center',
  },
  inputs: {
    gap: 30,
  },
  success: {
    textAlign: 'center',
  },
});
