import { CreateRaceForm } from '../types/create-race-form';
import { Race } from '../types/race.type';
import axios from 'axios';

const baseUrl = `http://192.168.1.84:3000/api`;

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

export const createRace = async (formData: CreateRaceForm): Promise<Race> => {
  try {
    const url = `${baseUrl}/race`;

    const body = {
      track: formData.track,
      closingIn: formData.closingIn,
      name: formData.name,
    };

    const { data } = await axios.post(url, body);

    return data as Race;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
