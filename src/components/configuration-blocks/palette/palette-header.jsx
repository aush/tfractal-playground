import _ from 'lodash';
import CSSModules from 'react-css-modules';
import Palette from './palette';
import React from 'react';
import Rectangle from 'react-rectangle';
import styles from './palette-header.styl';

const PaletteHeader = ({ palette, ...rest }) =>
  <Rectangle
    aspectRatio={3}
    styleName="container"
    {...rest}
  >
    <Palette value={_.slice(palette, 1)} />
  </Rectangle>;

export default CSSModules(PaletteHeader, styles);
