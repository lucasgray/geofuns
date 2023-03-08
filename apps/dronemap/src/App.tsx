import React, { useEffect, useRef, useState } from 'react';
import Map, { MapRef, NavigationControl, useControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapboxOverlay, MapboxOverlayProps } from '@deck.gl/mapbox/typed';
import { centerFor, initialViewState } from './utils/mapDeets';
import { LineGeoJson, PolygonGeoJson } from 'client/client';
import PoiPanel, { DecoratedPoi } from './components/PoiPanel';
import './App.css';
import PoiUpdatePanel from './components/PoiUpdatePanel';
import namesFromPois from './utils/namesFromPois';
import getFillColorFor from './utils/getFillColorFor';
import { GeoJsonLayer } from '@deck.gl/layers/typed';
import client from './client';

/**
 * A thing we have to do to connect react-map-gl to deck-gl (for the newer version of map-gl & mapbox)
 * Detail here: https://deck.gl/docs/api-reference/mapbox/mapbox-overlay#using-with-react-map-gl
 *
 * This ensures deck.gl and map-gl are synchronized behind the scenes - both respond to updates in
 * viewState in unison.
 *
 */
function DeckGLOverlay(
  props: MapboxOverlayProps & {
    interleaved?: boolean;
  }
) {
  const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props));
  overlay.setProps(props);
  return null;
}

/**
 * Main map and entry point of the application. Does a little too much, could be broken up.
 *
 * App could continue to be the state storage (or we could pull in state management)
 * I like the look of useSWR or react-query
 */
function App() {
  const [flightpaths, setFlightpaths] = useState<LineGeoJson[]>([]);
  const [pois, setPois] = useState<{ [id: string | number]: DecoratedPoi }>({});
  const [highlightedPoiId, setHighlightedPoiId] = useState<number | string>();
  const [hoveredPoiId, setHoveredPoi] = useState<number | string>();
  const [updatingPoi, setUpdatingPoi] = useState<PolygonGeoJson>();
  const [viewState, setViewState] = useState({
    ...initialViewState,
    longitude: 0,
    latitude: 0,
  });

  // canned - ask for "canned" data points
  const canned = new URLSearchParams(document.location.search).get('canned');
  const mapRef = useRef<MapRef>(null);

  useEffect(() => {
    client.getFlightpaths(!!canned).then(setFlightpaths);
    client.getPois(!!canned).then((pois) => {
      setPois(Object.fromEntries(pois.map((p) => [p.properties.id, p])));
    });
  }, []);

  const poiList = Object.values(pois);

  useEffect(() => {
    if (flightpaths.length > 0 && poiList.length > 0 && viewState.latitude === 0) {
      const center = centerFor(poiList, flightpaths);
      setViewState({ ...viewState, longitude: center[0], latitude: center[1] });
    }
  }, [flightpaths, pois]);

  if (flightpaths.length === 0 || poiList.length === 0 || viewState.latitude === 0) {
    // TODO better loading
    return null;
  }

  // the geojson layer handles displaying everything - drone lines, pois, and text
  const geojson = new GeoJsonLayer({
    id: 'geojson-layer',
    data: [...flightpaths, ...poiList, ...namesFromPois(poiList)],
    pickable: true,
    stroked: false,
    filled: true,
    extruded: true,
    lineWidthScale: 20,
    lineWidthMinPixels: 2,
    getLineWidth: 1,
    getLineColor: () => [255, 140, 0],
    getTextColor: [255, 255, 255, 200],
    getTextSize: 22,
    getTextPixelOffset: () => [-20, 0],
    getTextAnchor: 'end',
    pointType: 'text',
    getFillColor: (d) => getFillColorFor(d, highlightedPoiId, hoveredPoiId, 215),
    getElevation: (d) => {
      if (d.geometry.type !== 'Polygon') return 30;
      return d.properties!.height;
    },
    onHover: (d: any) => {
      if (d.featureType !== 'polygons') return;
      setHoveredPoi(d?.object?.properties?.id);
    },
    onClick: (d: any) => {
      if (d.featureType !== 'polygons') return;
      setHoveredPoi(d?.object?.properties?.id);
      setHighlightedPoiId(d?.object?.properties?.id);
      setUpdatingPoi(d?.object);
    },
  });

  // highlight happens from the sidebar
  // when the cursor is hovered on a sidebar poi we zoom to focus that poly
  const onHighlightPoi = (p?: PolygonGeoJson) => {
    if (updatingPoi) return;

    if (!p) {
      setHighlightedPoiId(undefined);
    } else {
      mapRef.current?.flyTo({
        center: [p!.geometry.coordinates[0][0][0], p!.geometry.coordinates[0][0][1]],
        zoom: 14,
        duration: 1000,
      });
      setHighlightedPoiId(p?.properties?.id);
    }
  };

  return (
    <div style={{ height: '100vh' }}>
      <PoiPanel
        pois={pois}
        onHighlightPoi={onHighlightPoi}
        onRequestUpdatePoi={(p) => setUpdatingPoi(p)}
        hoveredPoiId={hoveredPoiId}
      />
      {updatingPoi && (
        <PoiUpdatePanel
          poi={updatingPoi}
          onDismiss={() => {
            setUpdatingPoi(undefined);
            setHoveredPoi(undefined);
            setHighlightedPoiId(undefined);
          }}
          onUpdatePoi={(u) => {
            const updated = { ...pois };
            updated[u.properties.id] = u;
            setPois(updated);
            setUpdatingPoi(undefined);
            setHoveredPoi(undefined);
            setHighlightedPoiId(undefined);
          }}
        />
      )}
      <div className={'map'}>
        <Map
          {...viewState}
          ref={mapRef}
          onMove={(evt) => setViewState(evt.viewState)}
          reuseMaps
          onRender={(event) => {
            event.target.resize();
          }}
          initialViewState={viewState}
          mapStyle='mapbox://styles/lucgray/clevzz3go005001n3y4wgi570'
        >
          <DeckGLOverlay layers={[geojson]} />
          <NavigationControl visualizePitch={true} />
        </Map>
      </div>
    </div>
  );
}
export default App;
