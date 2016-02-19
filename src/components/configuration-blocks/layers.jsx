import * as _ from 'lodash';
import CSSModules from 'react-css-modules';
import Paper from 'material-ui/lib/paper';
import React from 'react';
import styles from './layers.styl';
import { Horizontal } from 'react-stack';

const Layers = ({ value, maxLayers, onChange, ...rest }) => (
  <Horizontal {...rest}>
  {
    _.map(_.range(1, maxLayers + 1), layer => (
      <Paper
        grow={1}
        key={layer}
        onClick={() => onChange(layer)}
        rounded={false}
        style={{ background: layer === value ? '#651FFF' : 'white' }}
        styleName={`${layer === value ? 'selected-' : ''}layer`}
        zDepth={1}
      >
        {layer}
      </Paper>
    ))
  }
  </Horizontal>
);

export default CSSModules(Layers, styles);
