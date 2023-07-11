import { Race } from '../race.type';
import { RaceEvent } from '../race-event.type';
import { RaceEventSubscription } from '../../../../api/src/shared/entities/race-event-subscription';

export type User = {
  id: string;
  email: string;
  username: string;
  pp: string;
  createdRaces: Race[];
  subscribedEvents: RaceEventSubscription[];
};
