import { Race } from '../race.type';

export type User = {
  id: string;
  email: string;
  username: string;
  pp: string;
  createdRaces: Race[];
};
