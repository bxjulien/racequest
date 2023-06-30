import { CreateRaceForm } from '../types/create-race-form';
import axios from 'axios';
import { Race } from '../types/race.type';

const baseUrl = `http://10.15.193.232:3000/api`;

export const getAutoTracks = async (
  longitude: number,
  latitude: number,
  distance: number
) => {
  try {
    const url = `${baseUrl}/track?longitudeStart=${longitude}&latitudeStart=${latitude}&distance=${distance}`;

    const { data } = await axios.get(encodeURI(url));

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createRace = async (data: CreateRaceForm): Promise<Race> => {
  try {
    const url = `${baseUrl}/race`;

    const body = {
      race: data.race,
      closingIn: data.closingIn,
      name: data.name,
    };

    const { data: race } = await axios.post(url, body);

    return race;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
