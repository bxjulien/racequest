import axios from 'axios';

import Constants from 'expo-constants';

const MAPBOX_API_KEY = Constants?.manifest?.extra?.MAPBOX_API_KEY;

if (!MAPBOX_API_KEY) throw new Error('Missing MAPBOX_API_KEY');

const baseUrl = 'https://api.mapbox.com';

export const getPlaces = async (query: string) => {
  const url = `${baseUrl}/geocoding/v5/mapbox.places/${encodeURIComponent(
    query
  )}.json?proximity=ip&access_token=${MAPBOX_API_KEY}`;

  const { data } = await axios.get(url);

  return data;
};

export const getAddressFromCoordinates = async (
  longitude: number,
  latitude: number
): Promise<string> => {
  const url = `${baseUrl}/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${MAPBOX_API_KEY}`;

  const { data } = await axios.get(url);

  if (!data.features.length) throw new Error('No address found');

  return data.features[0].place_name;
};
