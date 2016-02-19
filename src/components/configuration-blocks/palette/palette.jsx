import _ from 'lodash';
import CSSModules from 'react-css-modules';
import Paper from 'material-ui/lib/paper';
import React from 'react';
import styles from './palette.styl';
import { Horizontal } from 'react-stack';

const Palette = ({ value, ...rest }) => (
  <Paper
    rounded={false}
    styleName="container-paper"
    zDepth={1}
    {...rest}
  >
    <Horizontal styleName="container">
    {
      _.map(value, color => (
        <div
          grow={1}
          key={color.hexString()}
          style={{ background: color.rgbaString() }}
        />
      ))
    }
    </Horizontal>
  </Paper>
);

export default CSSModules(Palette, styles);
