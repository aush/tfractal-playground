import ColorMap from './configuration-blocks/color-map';
import CSSModules from 'react-css-modules';
import Dropdown from './configuration-blocks/drop-down';
import Layers from './configuration-blocks/layers';
import PaletteHeader from './configuration-blocks/palette/palette-header';
import PaletteList from './configuration-blocks/palette/palette-list';
import React from 'react';
import Size from './configuration-blocks/size';
import styles from './configurator.styl';
import { Vertical } from 'react-stack';

const Configurator = ({
  changeColorMap,
  changeLayers,
  changePalette,
  changeSize,
  colorMap,
  layers,
  layersOpen,
  openLayers,
  openSize,
  openPalette,
  palette,
  paletteOpen,
  sizeOpen,
}) => (
  <Vertical>
    <ColorMap
      colorMap={colorMap}
      onChange={changeColorMap}
      palette={palette}
    />
    <Dropdown
      header={`Layers: ${layers}`}
      isOpen={layersOpen}
      onChange={openLayers}
      styleName="drop-down"
    >
      <Layers
        maxLayers={7}
        onChange={changeLayers}
        value={layers}
      />
    </Dropdown>
    <Dropdown
      header={`Size: ${colorMap.length}x${colorMap[0].length}`}
      isOpen={sizeOpen}
      onChange={openSize}
      styleName="drop-down"
    >
      <Size
        height={colorMap[0].length}
        maxHeight={6}
        maxWidth={6}
        onChange={changeSize}
        width={colorMap.length}
      />
    </Dropdown>
    <Dropdown
      styleName="drop-down"
      header={<PaletteHeader palette={palette} />}
      isOpen={paletteOpen}
      onChange={openPalette}
    >
      <PaletteList onChange={changePalette} />
    </Dropdown>
  </Vertical>
);

export default CSSModules(Configurator, styles);
