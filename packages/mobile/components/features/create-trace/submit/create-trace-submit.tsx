import { StyleSheet, Text, View } from 'react-native';

import { CreateTraceForm } from '../../../../shared/types/create-trace-form';
import MapTrace from '../../../shared/map-trace/map-trace';
import React from 'react';

type CreateTraceSubmitProps = {
  value: CreateTraceForm;
};

export default function CreateTraceSubmit({ value }: CreateTraceSubmitProps) {
  if (!value.trace) return <Retry />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tout est prêt !</Text>
      <Text style={styles.subtitle}>Votre course est prête à être lancée.</Text>
      <MapTrace
        style={styles.map}
        height={350}
        trace={value.trace}
        strokeWidth={4}
      />
      <View style={styles.infos}>
        <View>
          <Text style={styles.infoTitle}>Distance</Text>
          <Text style={styles.infoValue}>{value.trace.distance}km</Text>
        </View>

        <View>
          <Text style={styles.infoTitle}>Dénivelé</Text>
          <Text style={styles.infoValue}>120 m</Text>
        </View>

        <View>
          <Text style={styles.infoTitle}>Se termine dans</Text>
          <Text style={styles.infoValue}>{value.closingIn} jours</Text>
        </View>
      </View>
    </View>
  );
}

const Retry = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Oups !</Text>
    <Text style={styles.subtitle}>
      Une erreur innatendue s'est produite lors de la création de votre course.
      Il semble que vous n'ayez pas sélectionné de tracé.
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    gap: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: 'grey',
  },
  map: {
    borderWidth: 2,
    borderColor: 'lightgrey',
    borderRadius: 20,
  },
  infos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoTitle: {
    color: 'grey',
  },
  infoValue: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
