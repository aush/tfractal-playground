import _ from 'lodash';
import { createStore } from 'redux';
import reducer from './ducks/reducer';
import Color from 'color';
import { generateRandomConfiguration } from '../common/configuration-utils';

const initialState = {
  configuration: {
    palette: [Color('#FFFFFF'), Color('#009688'), Color('#CDDC39'), Color('#E91E63')],
    colorMap: [
      [Color('#E91E63'), Color('#FFFFFF'), Color('#FFFFFF')],
      [Color('#FFFFFF'), Color('#FFFFFF'), Color('#E91E63')],
      [Color('#FFFFFF'), Color('#E91E63'), Color('#FFFFFF')],
    ],
    cellSize: 8,
    layers: 3,
    background: Color('#FFFFFF'),
    opacity: 0.5,
  },
  ui: {
    layersOpen: false,
    sizeOpen: false,
    paletteOpen: false,
  },
};

initialState.configuration = {
  ...initialState.configuration,
  ...generateRandomConfiguration(initialState.configuration),
};

export default () => createStore(
  reducer,
  initialState,
  window.devToolsExtension ? window.devToolsExtension() : undefined
);
