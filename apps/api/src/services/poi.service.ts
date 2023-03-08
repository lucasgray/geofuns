import { cannedPoiDao, flightpathDao, poiDao } from '../daos/';
import * as helpers from '@turf/helpers';

const getPoisAsGeoJson = async (canned: boolean) => {
  const pois = canned ? await cannedPoiDao.get() : await poiDao.get();

  return pois.map((p) =>
    helpers.polygon([p.coordinates], {
      id: p.id,
      height: p.height,
    })
  );
};

export default { getPoisAsGeoJson };
