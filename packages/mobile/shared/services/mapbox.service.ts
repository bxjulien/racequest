import axios from "axios";

import Constants from "expo-constants";

const MAPBOX_API_KEY = Constants?.manifest?.extra?.MAPBOX_API_KEY;

if (!MAPBOX_API_KEY) throw new Error("Missing MAPBOX_API_KEY");

const baseUrl = "https://api.mapbox.com";

export const getPlaces = async (query: string) => {
  const url = `${baseUrl}/geocoding/v5/mapbox.places/${encodeURIComponent(
    query
  )}.json?proximity=ip&access_token=${MAPBOX_API_KEY}`;

  const { data } = await axios.get(url);

  return data;
};
