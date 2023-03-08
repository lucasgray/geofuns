export const poiTypes: { [id in PoiType]: string } = {
  'Structure of Interest': '#F6287D',
  Friendly: '#8DE41C',
  'Vehicle of Interest': '#B916CC',
  Unknown: '#4dffe4',
};

export type PoiType = 'Structure of Interest' | 'Friendly' | 'Vehicle of Interest' | 'Unknown';
