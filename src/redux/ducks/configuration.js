import {
  changeColorMapSize,
  decodeConfiguration,
  denormalizeConfiguration,
  generateRandomConfiguration,
  repaletteColorMap,
} from '../../common/configuration-utils';

const APLLY_CONFIGURATION_FROM_HASH = 'tfractal-playground/configuration/APLLY_CONFIGURATION_FROM_HASH';
const CHANGE_BACKGROUND = 'tfractal-playground/configuration/CHANGE_BACKGROUND';
const CHANGE_CELLSIZE = 'tfractal-playground/configuration/CHANGE_CELLSIZE';
const CHANGE_COLORMAP = 'tfractal-playground/configuration/CHANGE_COLORMAP';
const CHANGE_LAYERS = 'tfractal-playground/configuration/CHANGE_LAYERS';
const CHANGE_OPACITY = 'tfractal-playground/configuration/CHANGE_OPACITY';
const CHANGE_PALETTE = 'tfractal-playground/configuration/CHANGE_PALETTE';
const CHANGE_SIZE = 'tfractal-playground/configuration/CHANGE_SIZE';
const GENERATE_RANDOM = 'tfractal-playground/configuration/GENERATE_RANDOM';

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case APLLY_CONFIGURATION_FROM_HASH:
      try {
        return {
          ...state,
          ...denormalizeConfiguration(decodeConfiguration(action.input)),
        };
      } catch (e) {
        return state;
      }
    case CHANGE_BACKGROUND:
      return {
        ...state,
        background: action.background,
      };
    case CHANGE_CELLSIZE:
      return {
        ...state,
        cellSize: action.cellSize,
      };
    case CHANGE_COLORMAP:
      return {
        ...state,
        colorMap: action.colorMap,
      };
    case CHANGE_LAYERS:
      return {
        ...state,
        layers: action.layers,
      };
    case CHANGE_OPACITY:
      return {
        ...state,
        opacity: action.opacity,
      };
    case CHANGE_PALETTE:
      return {
        ...state,
        palette: action.palette,
        colorMap: repaletteColorMap(
          state.colorMap,
          state.palette,
          action.palette
        ),
      };
    case CHANGE_SIZE:
      return {
        ...state,
        colorMap: changeColorMapSize(
          state.colorMap,
          state.palette,
          action.width,
          action.height
        ),
      };
    case GENERATE_RANDOM:
      return {
        ...state,
        ...generateRandomConfiguration(state),
      };
    default:
      return state;
  }
}

export const apllyConfigurationFromHash = input => ({ type: APLLY_CONFIGURATION_FROM_HASH, input });
export const changeBackground = background => ({ type: CHANGE_BACKGROUND, background });
export const changeCellSize = cellSize => ({ type: CHANGE_CELLSIZE, cellSize });
export const changeColorMap = colorMap => ({ type: CHANGE_COLORMAP, colorMap });
export const changeLayers = layers => ({ type: CHANGE_LAYERS, layers });
export const changeOpacity = opacity => ({ type: CHANGE_OPACITY, opacity });
export const changePalette = palette => ({ type: CHANGE_PALETTE, palette });
export const changeSize = ({ width, height }) => ({ type: CHANGE_SIZE, width, height });
export const generateRandom = () => ({ type: GENERATE_RANDOM });
