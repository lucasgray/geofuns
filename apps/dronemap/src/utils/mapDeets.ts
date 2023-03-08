import * as helpers from '@turf/helpers';
import center from '@turf/center';
import { LineGeoJson, PolygonGeoJson } from 'client/client';

/**
 * From pois and flightpaths, return center
 *
 * @param pois
 * @param flightpaths
 */
export const centerFor = (pois: PolygonGeoJson[], flightpaths: LineGeoJson[]) => {
  // TODO include flightpaths
  const poisAsFeatureCollection = helpers.featureCollection([...pois]);
  return center(poisAsFeatureCollection).geometry.coordinates;
};

export const initialViewState = {
  zoom: 12,
  pitch: 60,
  bearing: 0,
  padding: {
    top: 5,
    bottom: 5,
    left: 5,
    right: 5,
  },
};
