import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import React from 'react';

export default function ChooseOnMap() {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.5}>
      <View style={styles.placeholder}></View>
      <Text>Choisir sur la carte</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeholder: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: '#ccc',
    marginRight: 15,
  },
});
