import { Get, Query, Route } from 'tsoa';
import poiService from '../services/poi.service';
import { PolygonGeoJson } from 'types/src/geojson';

@Route('pois')
export class PoiController {
  @Get('/')
  public async getPois(@Query() canned: boolean): Promise<PolygonGeoJson[]> {
    return poiService.getPoisAsGeoJson(canned) as unknown as PolygonGeoJson[];
  }
}
