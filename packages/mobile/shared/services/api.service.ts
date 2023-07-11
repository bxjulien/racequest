import { CreateRaceForm } from '../types/create-race-form';
import { LOCAL_IP } from '../../constants';
import { Race } from '../types/race.type';
import { RequestMethod } from '../enums/request-method';
import axios from 'axios';

const baseUrl = `http://${LOCAL_IP}:3000/api`;

const request = async (
  url: string,
  method: string = RequestMethod.GET,
  body: any = null,
  headers: any = {}
) => {
  try {
    const response = await axios({
      url,
      method,
      data: body,
      headers,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAutoTracks = async (
  longitude: number,
  latitude: number,
  distance: number
) => {
  const params = new URLSearchParams({
    longitudeStart: longitude.toString(),
    latitudeStart: latitude.toString(),
    distance: distance.toString(),
  });
  const url = `${baseUrl}/tracks/auto?${params.toString()}`;

  return request(url);
};

export const getNearbyRaces = async (
  longitude: number,
  latitude: number,
  radius: number,
  maxDistance?: number
): Promise<Race[]> => {
  const params = new URLSearchParams({
    longitude: longitude.toString(),
    latitude: latitude.toString(),
    radius: radius.toString(),
    maxDistance: maxDistance?.toString() ?? '',
  });
  const url = `${baseUrl}/races/nearby?${params.toString()}`;

  return request(url);
};

export const getRace = async (id: number): Promise<Race> => {
  const url = `${baseUrl}/races/${id}`;

  return request(url);
};

export const createRace = async (
  formData: CreateRaceForm,
  accessToken: string
): Promise<Race> => {
  const url = `${baseUrl}/races`;
  const body = {
    track: formData.track,
    closingIn: formData.closingIn,
    name: formData.name,
  };
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  return request(url, RequestMethod.POST, body, headers);
};

export const getUser = async (accessToken: string) => {
  const url = `${baseUrl}/users/me`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  return request(url, RequestMethod.GET, null, headers);
};

export const subscribeToRace = async (raceId: number, accessToken: string) => {
  const url = `${baseUrl}/races/${raceId}/subscribe`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  return request(url, RequestMethod.POST, null, headers);
};
