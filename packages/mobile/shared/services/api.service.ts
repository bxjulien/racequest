import axios from "axios";

const baseUrl = "https://racequest-production.up.railway.app/api";

export const getCreationTraces = async (
  longitude: number,
  latitude: number,
  distance: number
) => {
  const url = `${baseUrl}/trace?longitude=${longitude}&latitude=${latitude}&distance=${distance}`;

  const { data } = await axios.get(encodeURI(url));

  return data;
};
