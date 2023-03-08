import { Get, Query, Route } from 'tsoa';
import flightpathService from '../services/flightpath.service';
import { LineGeoJson } from 'types/src/geojson';

@Route('flightpaths')
export class FlightpathsController {
  @Get('/')
  public async getFlightpaths(@Query() canned: boolean): Promise<LineGeoJson[]> {
    return flightpathService.getFlightpathsAsGeoJson(canned) as unknown as LineGeoJson[];
  }
}
