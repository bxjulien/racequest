import { CreateTraceForm } from '../types/create-trace-form';
import axios from 'axios';

const baseUrl = `http://10.15.191.117:3000/api`;

export const getCreationTraces = async (
  longitude: number,
  latitude: number,
  distance: number
) => {
  const url = `${baseUrl}/trace?longitudeStart=${longitude}&latitudeStart=${latitude}&distance=${distance}`;

  const { data } = await axios.get(encodeURI(url));

  return data;
};

export const createTrace = async (data: CreateTraceForm) => {
  try {
    const url = `${baseUrl}/trace`;

    const body = {
      trace: data.trace,
      closingIn: data.closingIn,
    };

    const { data: trace } = await axios.post(url, body);

    return trace;
  } catch (error) {
    console.error(error);
  }
};
