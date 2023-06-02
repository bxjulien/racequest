export type Place = {
  id?: string;
  place_name: string;
  center: number[];
  type: 'current-location' | 'place';
};
