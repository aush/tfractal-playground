const LAYERS_BOX_OPEN = 'tfractal-playground/ui/LAYERS_BOX_OPEN';
const PALETTE_BOX_OPEN = 'tfractal-playground/ui/PALETTE_BOX_OPEN';
const SIZE_BOX_OPEN = 'tfractal-playground/ui/SIZE_BOX_OPEN';

const allClosed = {
  layersOpen: false,
  paletteOpen: false,
  sizeOpen: false,
};

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case LAYERS_BOX_OPEN:
      return { ...state, ...allClosed, layersOpen: action.isOpen };
    case PALETTE_BOX_OPEN:
      return { ...state, ...allClosed, paletteOpen: action.isOpen };
    case SIZE_BOX_OPEN:
      return { ...state, ...allClosed, sizeOpen: action.isOpen };
    default:
      return state;
  }
}

export const openLayers = (isOpen) => ({ type: LAYERS_BOX_OPEN, isOpen });
export const openPalette = (isOpen) => ({ type: PALETTE_BOX_OPEN, isOpen });
export const openSize = (isOpen) => ({ type: SIZE_BOX_OPEN, isOpen });
