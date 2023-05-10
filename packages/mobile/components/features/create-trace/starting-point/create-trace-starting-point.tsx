import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import InputText from "../../../shared/input/input-text";
import { Place } from "../../../../shared/types/place.type";
import { RadioButton } from "../../../shared/radio/radio";
import React from "react";
import useDebounce from "../../../../shared/hooks/useDebounce";
import usePlacesGeocodingQuery from "../../../../shared/hooks/queries/usePlacesGeocodingQuery.hook";
import { useState } from "react";
import { useLocationContext } from "../../../../shared/contexts/location.context";

export default function CreateTraceStartingPoint() {
  const [query, setQuery] = useState("");
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
        <View style={styles.choices}>
          <UseCurrentLocation
            setQuery={setQuery}
            setSelectedPlace={setSelectedPlace}
          />
          <InputText
            query={query}
            onChange={setQuery}
            placeholder="Rechercher une ville, un lieu, ..."
          />
        </View>
      )}

      {selectedPlace && (
        <RadioButton
          label={selectedPlace.place_name}
          value={selectedPlace.place_name}
          selectedValue={selectedPlace.place_name}
          style={styles.selectedPlace}
          canUnselect={true}
          onValueChange={() => {
            setQuery("");
            setSelectedPlace(null);
          }}
        />
      )}

      {!selectedPlace && (
        <FlatList
          data={places}
          renderItem={renderItem as any}
          keyExtractor={(item: Place) => item.id}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const UseCurrentLocation = ({
  setQuery,
  setSelectedPlace,
}: {
  setQuery: (query: string) => void;
  setSelectedPlace: (place: Place) => void;
}) => {
  const { location } = useLocationContext();

  const place = {
    id: "current",
    place_name: "Utiliser ma position actuelle",
    center: [location?.coords.longitude, location?.coords.latitude],
  };

  if (!location)
    return (
      <View>
        <Text>Impossible de récupérer votre position actuelle</Text>
      </View>
    );

  return (
    <RadioButton
      label={place.place_name}
      value={place.place_name}
      selectedValue={place.place_name}
      onValueChange={(value) => {
        setQuery(value);
        setSelectedPlace({
          id: "current",
          place_name: "Ma position actuelle",
          center: [location.coords.longitude, location.coords.latitude],
        });
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  choices: {
    gap: 20,
  },
  place: {
    marginVertical: 5,
  },
  selectedPlace: {
    marginTop: 20,
  }
});
