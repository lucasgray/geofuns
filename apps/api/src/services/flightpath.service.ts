import { cannedFlightpathDao, flightpathDao } from '../daos/';
import * as helpers from '@turf/helpers';

const getFlightpathsAsGeoJson = async (canned: boolean) => {
  const flightpaths = canned ? await cannedFlightpathDao.get() : await flightpathDao.get();

  return flightpaths.map((f) => helpers.lineString(f.coordinates));
};

export default { getFlightpathsAsGeoJson };
