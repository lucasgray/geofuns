import { LatLong, Uuid } from './index';
import Classification from './classification';

export default interface Poi {
  id: Uuid;
  coordinates: LatLong[];
  base: number;
  height: number;
  classification: Classification;
}
