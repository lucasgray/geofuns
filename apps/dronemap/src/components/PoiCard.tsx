import React from 'react';
import { PolygonGeoJson } from 'client/client';
import { DecoratedPoi } from './PoiPanel';
import './PoiCard.css';
import { poiTypes } from '../constants';

type Props = {
  poi: DecoratedPoi;
  hovered: boolean;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

/**
 * Display a poi in the sidebar. This is pretty basic in the interest of time
 *
 * @param poi - the poi to display
 * @param hovered - whether the poi is hovered on the map
 * @param props
 */
const PoiCard: React.FC<Props> = ({ poi, hovered, ...props }) => {
  let borderColor = '#EC8202';
  if (hovered) {
    borderColor = 'yellow';
  }
  if (poi.poiType) {
    borderColor = poiTypes[poi.poiType];
  }

  let textColor = '#5b7bdf';
  if (poi.name) {
    textColor = 'white';
  }

  return (
    <div className={'poi-card'} {...props} style={{ border: `1px solid ${borderColor}` }}>
      <div style={{ color: textColor }}>{poi.name || 'Unidentified Poi'}</div>
    </div>
  );
};

export default PoiCard;
