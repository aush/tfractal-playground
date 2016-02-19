import ColorMap from './color-map';
import CSSModules from 'react-css-modules';
import Dropdown from './drop-down';
import Layers from './tabs/layers';
import PaletteHeader from './tabs/palette-list/palette-header';
import PaletteList from './tabs/palette-list/palette-list';
import React from 'react';
import Size from './tabs/size';
import styles from './tfractal-configurator.styl';
import { Vertical } from 'react-stack';

const Configurator = ({
  changeColorMap,
  changeLayers,
  changePalette,
  changeSize,
  colorMap,
  layers,
  layersOpen,
  onOpenLayers,
  onOpenPalette,
  onOpenSize,
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
      onChange={onOpenLayers}
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
      onChange={onOpenSize}
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
      header={
        <PaletteHeader
          isOpen={paletteOpen}
          onChange={onOpenPalette}
          palette={palette}
        />
      }
      styleName="drop-down"
    >
      <PaletteList onChange={changePalette} />
    </Dropdown>
  </Vertical>
);

export default CSSModules(Configurator, styles);
