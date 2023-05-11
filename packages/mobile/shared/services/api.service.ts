import axios from 'axios';

const baseUrl = 'http://192.168.1.84:3000/api'; //"https://racequest-production.up.railway.app/api";

export const getCreationTraces = async (
  longitude: number,
  latitude: number,
  distance: number
) => {
  const url = `${baseUrl}/trace?longitude=${longitude}&latitude=${latitude}&distance=${distance}`;

  const { data } = await axios.get(encodeURI(url));

  return data;
};
