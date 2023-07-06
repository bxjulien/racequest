import { LOCAL_IP } from '../../constants';
import { CreateRaceForm } from '../types/create-race-form';
import { Race } from '../types/race.type';
import axios from 'axios';

const baseUrl = `http://${LOCAL_IP}:3000/api`;

export const getAutoTracks = async (
  longitude: number,
  latitude: number,
  distance: number
) => {
  try {
    const url = `${baseUrl}/tracks/auto?longitudeStart=${longitude}&latitudeStart=${latitude}&distance=${distance}`;

    const { data } = await axios.get(encodeURI(url));

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getNearbyRaces = async (
  longitude: number,
  latitude: number,
  radius: number
): Promise<Race[]> => {
  try {
    const url = `${baseUrl}/races/nearby?longitude=${longitude}&latitude=${latitude}&radius=${radius}`;

    const { data } = await axios.get(url);

    return data as Race[];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getNearbyShortRaces = async (
  longitude: number,
  latitude: number,
  radius: number,
  maxDistance: number
): Promise<Race[]> => {
  try {
    const url = `${baseUrl}/races/nearby?longitude=${longitude}&latitude=${latitude}&radius=${radius}&maxDistance=${maxDistance}`;

    const { data } = await axios.get(url);

    return data as Race[];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createRace = async (formData: CreateRaceForm): Promise<Race> => {
  try {
    const url = `${baseUrl}/races`;

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
