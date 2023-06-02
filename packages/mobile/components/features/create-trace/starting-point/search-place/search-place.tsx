import { useEffect, useState } from 'react';
import { Place } from '../../../../../shared/types/place.type';
import useDebounce from '../../../../../shared/hooks/useDebounce';
import usePlacesGeocodingQuery from '../../../../../shared/hooks/queries/usePlacesGeocodingQuery.hook';
import { RadioButton } from '../../../../shared/radio/radio';
import InputText from '../../../../shared/input/input-text';
import { StyleSheet, View } from 'react-native';
import { StartingPoint } from '../../../../../shared/types/starting-point.type';

export const SearchPlace = ({
  value,
  setValue,
}: {
  value: StartingPoint | null;
  setValue: (value: StartingPoint) => void;
}) => {
  const [query, setQuery] = useState<null | string>(value?.address || '');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const debouncedQuery = useDebounce(query, 300);
  const { data: places, isLoading } = usePlacesGeocodingQuery(debouncedQuery, {
    enabled: Boolean(debouncedQuery.length && !selectedPlace),
  });

  useEffect(() => {
    if (value) {
      setQuery(value.address || '');
      setSelectedPlace({
        place_name: value?.address || '',
        center: [value.longitude, value.latitude],
        type: 'place',
      });
    }
  }, [value]);

  return (
    <View style={styles.container}>
      <InputText
        query={query as string}
        onChange={(value) => {
          setQuery(value);
          setSelectedPlace(null);
        }}
        placeholder='Rechercher une ville, un lieu, ...'
      />

      {!selectedPlace &&
        places?.map((place) => (
          <RadioButton
            key={place.id}
            label={place.place_name}
            value={place.place_name}
            onValueChange={(value) => {
              setQuery(value as string);
              setSelectedPlace(place);
              setValue({
                address: place.place_name,
                longitude: place.center[0],
                latitude: place.center[1],
              });
            }}
            style={styles.place}
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  place: {
    marginVertical: 5,
  },
  selectedPlace: {
    marginTop: 20,
  },
});
