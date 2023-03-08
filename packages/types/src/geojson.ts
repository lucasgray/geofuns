import { LatLong } from './index';

export interface LineGeoJson {
  type: 'Feature';
  properties: {
    id: number | string;
  };
  geometry: {
    type: string;
    coordinates: LatLong[];
  };
}
export interface PolygonGeoJson {
  type: 'Feature';
  properties: {
    id: number | string;
    height: number;
  };
  geometry: {
    type: string;
    coordinates: LatLong[][];
  };
}
