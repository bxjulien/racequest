import { Trace } from '../../../api/src/shared/models/trace.model';
import { CreateTraceForm } from '../types/create-trace-form';
import axios from 'axios';

const baseUrl = `http://10.15.191.233:3000/api`;

export const getCreationTraces = async (
  longitude: number,
  latitude: number,
  distance: number
) => {
  try {
    const url = `${baseUrl}/trace?longitudeStart=${longitude}&latitudeStart=${latitude}&distance=${distance}`;

    const { data } = await axios.get(encodeURI(url));

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createTrace = async (data: CreateTraceForm): Promise<Trace> => {
  try {
    const url = `${baseUrl}/trace`;

    const body = {
      trace: data.trace,
      closingIn: data.closingIn,
      name: data.name,
    };

    const { data: trace } = await axios.post(url, body);

    return trace;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
