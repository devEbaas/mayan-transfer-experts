export const PLACE_KEYS = [
  'cun',
  'hotelzone',
  'pdc',
  'tulum',
  'morelos',
  'aventuras',
  'akumal',
  'mujeres',
  'holbox',
] as const;

export type PlaceKey = (typeof PLACE_KEYS)[number];
