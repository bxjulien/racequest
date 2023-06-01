import { FlatList, StyleSheet, Text, View } from 'react-native';

import ChooseOnMap from './choose-on-map/choose-on-map';
import InputText from '../../../shared/input/input-text';
import { Place } from '../../../../shared/types/place.type';
import { RadioButton } from '../../../shared/radio/radio';
import React from 'react';
import { StartingPoint } from '../../../../shared/types/starting-point.type';
import useDebounce from '../../../../shared/hooks/useDebounce';
import { useLocationContext } from '../../../../shared/contexts/location.context';
import usePlacesGeocodingQuery from '../../../../shared/hooks/queries/usePlacesGeocodingQuery.hook';
import { useState } from 'react';

export default function CreateTraceStartingPoint({
  value,
  setValue,
}: {
  value: StartingPoint | null;
  setValue: (value: StartingPoint) => void;
}) {
  return (
    <View style={styles.choices}>
      <UseMyCurrentLocation setValue={setValue} value={value} />
      <ChooseOnMap />
    </View>
  );
}

const UseMyCurrentLocation = ({
  setValue,
  value,
}: {
  setValue: (startingPoint: StartingPoint) => void;
  value: StartingPoint | null;
}) => {
  const { location } = useLocationContext();

  if (!location)
    return (
      <View>
        <Text>Impossible de récupérer votre position actuelle</Text>
      </View>
    );

  return (
    <View>
      <RadioButton
        label='Utiliser ma position actuelle'
        value={value?.name}
        selectedValue={value?.name}
        onValueChange={() => {
          setValue({
            name: 'Ma position actuelle',
            longitude: location.coords.longitude,
            latitude: location.coords.latitude,
          });
        }}
        description='La course commencera là où vous êtes actuellement !'
      />
    </View>
  );
};

const SearchPlace = () => {
  const [query, setQuery] = useState('');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const debouncedQuery = useDebounce(query, 300);
  const { data: places, isLoading } = usePlacesGeocodingQuery(debouncedQuery, {
    enabled: Boolean(debouncedQuery.length && !selectedPlace),
  });

  const renderPlaces = ({ item }: { item: Place }) => (
    <RadioButton
      label={item.place_name}
      value={item.place_name}
      selectedValue={selectedPlace?.place_name}
      onValueChange={(value) => {
        setQuery(value as string);
        setSelectedPlace(item);
      }}
      style={styles.place}
    />
  );

  {
    !selectedPlace && (
      <InputText
        query={query}
        onChange={setQuery}
        placeholder='Rechercher une ville, un lieu, ...'
      />
    );
  }

  {
    selectedPlace && (
      <RadioButton
        label={selectedPlace.place_name}
        value={selectedPlace.place_name}
        selectedValue={selectedPlace.place_name}
        style={styles.selectedPlace}
        canUnselect={true}
        onValueChange={() => {
          setQuery('');
          setSelectedPlace(null);
        }}
      />
    );
  }

  {
    !selectedPlace && (
      <FlatList
        data={places}
        renderItem={renderPlaces}
        keyExtractor={(item: Place) => item.id}
        keyboardShouldPersistTaps='handled'
        showsVerticalScrollIndicator={false}
      />
    );
  }
};

const styles = StyleSheet.create({
  choices: {
    gap: 10,
  },
  place: {
    marginVertical: 5,
  },
  selectedPlace: {
    marginTop: 20,
  },
});
