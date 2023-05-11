import axios from "axios";

const baseUrl = "http://localhost:3000/api"; //"https://racequest-production.up.railway.app/api";

export const getCreationTraces = async (
  longitude: number,
  latitude: number,
  distance: number
) => {
  const url = `${baseUrl}/trace?longitude=${longitude}&latitude=${latitude}&distance=${distance}`;

  console.log(url);

  const { data } = await axios.get(url);

  return data;
};
