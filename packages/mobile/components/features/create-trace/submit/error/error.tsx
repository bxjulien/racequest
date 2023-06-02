import { StyleSheet, Text, View } from 'react-native';

export const Error = () => (
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
    gap: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: 'grey',
  },
});
