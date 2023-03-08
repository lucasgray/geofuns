import { DecoratedPoi } from './PoiPanel';
import './PoiUpdatePanel.css';
import { PoiType, poiTypes } from '../constants';
import React, { useState } from 'react';

interface Props {
  poi: DecoratedPoi;
  onDismiss: () => void;
  onUpdatePoi: (updated: DecoratedPoi) => void;
}

type State = Pick<DecoratedPoi, 'name' | 'poiType'>;

/**
 * Creates the popover that allows the user to classify a poi.
 *
 * @param poi - the poi to classify
 * @param onDismiss - any cleanup needed when the popover is dismissed
 * @param onUpdatePoi - callback to update the poi
 */
const PoiUpdatePanel: React.FC<Props> = ({ poi, onDismiss, onUpdatePoi }) => {
  const [state, setState] = useState<State>();

  return (
    <div className='poi-update-panel'>
      <div
        className={'the-x'}
        onClick={() => {
          setState(undefined);
          onDismiss();
        }}
      >
        X
      </div>
      <h3>Classify as...</h3>
      <div className='classifications'>
        {Object.entries(poiTypes).map(([name, color]) => (
          <p
            key={name}
            style={{
              border: `2px solid ${color}`,
              backgroundColor: state?.poiType === name ? 'rgba(42,68,148,0.95)' : '',
            }}
            onClick={() => setState({ ...state, poiType: name as PoiType })}
          >
            {name}
          </p>
        ))}
      </div>
      <div className='name'>
        <div>Enter a name:</div>
        <input
          name='name'
          autoComplete='off'
          value={state?.name || ''}
          onChange={(e) => setState({ ...state, name: e?.target?.value ?? '' })}
        />
      </div>
      <div className='button-panel'>
        <button
          className='done'
          onClick={() => {
            onUpdatePoi({ ...poi, name: state?.name ?? '', poiType: state?.poiType ?? 'Unknown' });
          }}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default PoiUpdatePanel;
