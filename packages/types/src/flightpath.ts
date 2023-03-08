import { LatLong, Uuid } from './index';

export default interface Flightpath {
  id: Uuid;
  coordinates: LatLong[];
  base: number;
  height: number;
}
