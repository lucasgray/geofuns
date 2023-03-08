import { poiTypes } from '../constants';
import hexRgb from 'hex-rgb';

export default function getFillColorFor(
  d: any,
  highlightedPoiId: string | number | undefined,
  hoveredPoiId: string | number | undefined,
  transparency: number
): [number, number, number, number] {
  // if selected, highlight yellow
  if (d.properties.id === highlightedPoiId || d.properties.id === hoveredPoiId) {
    return [255, 255, 0, transparency];
  }

  // if triaged, use that color
  if (d.poiType) {
    // @ts-ignore
    const hexColor = poiTypes[d.poiType];
    const hexRgbColor = hexRgb(hexColor);

    return [hexRgbColor.red, hexRgbColor.green, hexRgbColor.blue, transparency];
  }
  return [255, 140, 0, transparency];
}
