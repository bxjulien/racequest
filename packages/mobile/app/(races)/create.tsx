import CreateRace from '../../components/features/create-race/create-race';
import React from 'react';
import { Redirect } from 'expo-router';
import { useAuthContext } from '../../shared/contexts/auth.context';

export default function CreateRaceScreen(): JSX.Element {
  const { user, session } = useAuthContext();

  if (!user || !session) return <Redirect href='/(auth)/login' />;

  return <CreateRace />;
}
