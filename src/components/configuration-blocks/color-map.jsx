import * as _ from 'lodash';
import Color from 'color';
import ColorPicker from 'react-4color-picker';
import colorPickerStyles from '../../../node_modules/react-4color-picker/dist/index.css';
import CSSModules from 'react-css-modules';
import Paper from 'material-ui/lib/paper';
import React from 'react';
import Square from 'react-rectangle';
import styles from './color-map.styl';
import {
  transposeColorMap,
  replaceColor,
} from '../../common/configuration-utils';


const ColorMap = ({ palette, colorMap, onChange, ...rest }) => (
  <div
    style={{ width: `${_.clamp(100 * colorMap.length / colorMap[0].length, 10, 100)}%` }}
    styleName="container"
  >
    <table
      styleName="table"
      {...rest}
    >
      <tbody>
      {
        _.map(transposeColorMap(colorMap), (column, indexInRow) => (
          <tr key={indexInRow}>
          {
            _.map(column, (color, indexInColumn) => (
              <td key={indexInColumn} styleName="td">
                <Square>
                  <Paper
                    styleName="colorpicker-paper"
                    rounded={false}
                    zDepth={1}
                  >
                    <ColorPicker
                      style={{ width: '100%', height: '100%' }}
                      palette={_.map(palette, c => c.hexString())}
                      selected={color.hexString()}
                      onSelect={value =>
                        onChange(replaceColor(
                          colorMap,
                          Color(value),
                          indexInColumn,
                          indexInRow
                        ))
                      }
                    />
                  </Paper>
                </Square>
              </td>
            ))
          }
          </tr>
        ))
      }
      </tbody>
    </table>
  </div>
);

export default CSSModules(ColorMap, { ...styles, ...colorPickerStyles });
