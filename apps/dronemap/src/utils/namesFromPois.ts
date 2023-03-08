import { DecoratedPoi } from '../components/PoiPanel';
import * as _ from 'lodash';

export default function namesFromPois(pois: DecoratedPoi[]) {
  return pois
    .filter((p) => !!p.name)
    .map((p) => ({
      type: 'Feature',
      properties: {
        height: 0,
        id: p.properties.id,
        text: p.name,
      },
      geometry: {
        coordinates: _.minBy(p.geometry.coordinates[0], (c) => c[0]),
        type: 'Point',
        pointType: 'text',
      },
    }));
}
