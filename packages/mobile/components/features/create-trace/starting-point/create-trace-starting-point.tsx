import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import InputText from '../../../shared/input/input-text';
import { Place } from '../../../../shared/types/place.type';
import { RadioButton } from '../../../shared/radio/radio';
import React from 'react';
import useDebounce from '../../../../shared/hooks/useDebounce';
import usePlacesGeocodingQuery from '../../../../shared/hooks/queries/usePlacesGeocodingQuery.hook';
import { useState } from 'react';

export default function CreateTraceStartingPoint() {
  const [query, setQuery] = useState('');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const debouncedQuery = useDebounce(query, 300);
  const { data: places, isLoading } = usePlacesGeocodingQuery(debouncedQuery, {
    enabled: Boolean(debouncedQuery.length && !selectedPlace),
  });

  const renderItem = ({ item }: { item: Place }) => (
    <RadioButton
      label={item.place_name}
      value={item.place_name}
      selectedValue={selectedPlace?.place_name}
      onValueChange={(value) => {
        setQuery(value);
        setSelectedPlace(item);
      }}
      style={styles.place}
    />
  );

  return (
    <View style={styles.container}>
      {!selectedPlace && (
        <InputText
          query={query}
          onChange={setQuery}
          placeholder='Rechercher une ville, un lieu, ...'
        />
      )}

      {selectedPlace && (
        <RadioButton
          label={selectedPlace.place_name}
          value={selectedPlace.place_name}
          selectedValue={selectedPlace.place_name}
          style={styles.selectedPlace}
        />
      )}

      {!selectedPlace && (
        <FlatList
          data={places}
          renderItem={renderItem as any}
          keyExtractor={(item: Place) => item.id}
          keyboardShouldPersistTaps='handled'
          showsVerticalScrollIndicator={false}
        />
      )}

      <RadioButton
        label={'Ma position actuelle'}
        value={'Ma position actuelle'}
        selectedValue={selectedPlace?.place_name}
        onValueChange={(value) => {
          setQuery(value);
          setSelectedPlace(null);
        }}
        style={styles.actualPosition}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  place: {
    marginVertical: 5,
  },
  selectedPlace: {
    marginTop: 20,
  },
  actualPosition: {
    marginTop: 20,
  },
});
