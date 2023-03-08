import FilebasedDao from './base/filebased.dao';
import Flightpath from 'types/src/flightpath';

export default class CannedFlightpathDao extends FilebasedDao<Flightpath> {
  constructor() {
    super('geodata/canned-flightpaths.json');
  }
}
