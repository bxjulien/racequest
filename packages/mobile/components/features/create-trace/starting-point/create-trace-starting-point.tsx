import React from "react";
import { View, Text } from "react-native";
import { useState } from "react";
import { getPlaces } from "../../../../shared/services/mapbox.service";


export default function CreateTraceStartingPoint() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300); // debounce the query with a 300ms delay
  const { data: results, isLoading } = useNearbyTracesQuery(debouncedQuery, { enabled: debouncedQuery.length > 0 });

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.resultItem} onPress={() => setQuery(item.place_name)}>
      <Text>{item.place_name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        placeholder="Search for a location"
      />
      {isLoading && <Text>Loading...</Text>}
      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});