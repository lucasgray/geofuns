import React, { useEffect } from 'react';
import { PolygonGeoJson } from 'client/client';
import './PoiPanel.css';
import PoiCard from './PoiCard';
import { PoiType } from '../constants';

export type DecoratedPoi = PolygonGeoJson & {
  name?: string;
  poiType?: PoiType;
};

interface Props {
  pois: { [id: string | number]: DecoratedPoi };
  onHighlightPoi: (p?: DecoratedPoi) => void;
  onRequestUpdatePoi: (p: DecoratedPoi) => void;
  hoveredPoiId: number | string | undefined;
}

/**
 * Display a list of pois, scrollable. Hover and click actions wired to view and update.
 *
 * @param pois - the pois to display
 * @param onHighlightPoi -  callback to highlight
 * @param onRequestUpdatePoi-  callback to update a poi
 * @param hoveredPoiId - currently hovered (in the map) poi
 */
const PoiPanel: React.FC<Props> = ({ pois, onHighlightPoi, onRequestUpdatePoi, hoveredPoiId }) => {
  useEffect(() => {
    if (!hoveredPoiId) return;

    const poiCard = document.getElementById(hoveredPoiId + '');

    if (!poiCard) return;

    poiCard.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
  }, [hoveredPoiId]);

  const sortedPois = Object.values(pois).sort(
    (a, b) => b.geometry.coordinates[0][0][1] - a.geometry.coordinates[0][0][1]
  );

  return (
    <div className={'poi-panel'}>
      <div className={'pois'}>
        {sortedPois.map((p) => {
          return (
            <PoiCard
              key={p.properties.id}
              id={p.properties.id + ''}
              poi={p}
              onMouseEnter={() => onHighlightPoi(p)}
              onMouseLeave={() => onHighlightPoi(undefined)}
              onClick={() => onRequestUpdatePoi(p)}
              hovered={hoveredPoiId === p.properties.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PoiPanel;
