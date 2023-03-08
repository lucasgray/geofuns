import FilebasedDao from './base/filebased.dao';
import Poi from 'types/src/poi';

export default class PoiDao extends FilebasedDao<Poi> {
  constructor() {
    super('geodata/pois.json');
  }
}
