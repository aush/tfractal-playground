import _ from 'lodash';
import Color from 'color';
import CSSModules from 'react-css-modules';
import Palette from './palette';
import palettes from './palettes';
import React from 'react';
import Rectangle from 'react-rectangle';
import styles from './palette-list.styl';
import withState from 'recompose/withState';
import { Horizontal, Vertical } from 'react-stack';

const convertedPalettes = _.map(palettes, palette => _.map(palette, color => Color(color)));

const ensureInRange = (end => value => value < end ? value : 0)(convertedPalettes.length);
/* eslint-disable no-constant-condition, func-names */
const getPalettesCircular = (function*() {
  let i = _.random(0, convertedPalettes.length) - 1;
  while (true) {
    yield convertedPalettes[i = ensureInRange(++i)];
  }
}());

const getPalettes = (function*() {
  let n = 0;
  while (true) {
    n = yield _.times(n, () => getPalettesCircular.next().value);
  }
}());
getPalettes.next();
/* eslint-enable */
const takeNext = () => getPalettes.next(30).value;

const whitefyPalette = (palette) => [Color('white'), ...palette];

const PaletteList = withState('displayedPalettes', 'setDisplayedPalettes', takeNext(),
  ({ onChange, displayedPalettes, setDisplayedPalettes, ...rest }) => {
    return (
      <Vertical {...rest}>
      {
        _.chain(displayedPalettes).chunk(3).map((palettesRow, index) => (
          <Horizontal key={index}>
          {
            _.map(palettesRow, palette => (
              <div
                grow={1}
                key={_.join(_.map(palette, color => color.hexString()), '')}
                styleName="palette"
                onClick={() => onChange(whitefyPalette(palette))}
              >
                <Rectangle
                  aspectRatio={3}
                  styleName="palette-container"
                >
                  <Palette value={palette} />
                </Rectangle>
              </div>
            ))
          }
          </Horizontal>
        )).value()
      }
        <div
          align={'center'}
          onClick={() => setDisplayedPalettes(takeNext())}
          styleName="more"
        >
          More palettes...
        </div>
      </Vertical>
    );
  }
);

export default CSSModules(PaletteList, styles);
