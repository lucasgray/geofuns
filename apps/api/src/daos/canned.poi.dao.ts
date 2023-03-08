import FilebasedDao from './base/filebased.dao';
import Poi from 'types/src/poi';

export default class CannedPoiDao extends FilebasedDao<Poi> {
  constructor() {
    super('geodata/canned-pois.json');
  }
}
