import axios from "axios";
import { CreateTraceForm } from "../types/create-trace-form";
// 10.15.190.225
const baseUrl = "http://10.15.190.225:3000/api";

export const getCreationTraces = async (
  longitude: number,
  latitude: number,
  distance: number
) => {
  const url = `${baseUrl}/trace?longitude=${longitude}&latitude=${latitude}&distance=${distance}`;

  const { data } = await axios.get(encodeURI(url));

  return data;
};

export const createTrace = async (data: CreateTraceForm) => {
  const url = `${baseUrl}/trace`;

  const body = {
    trace: data.trace,
    closingIn: data.closingIn,
  };

  console.log(body);

  const { data: trace } = await axios.post(url, body);

  return trace;
};
