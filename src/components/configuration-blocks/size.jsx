import * as _ from 'lodash';
import CSSModules from 'react-css-modules';
import Paper from 'material-ui/lib/paper';
import React from 'react';
import Square from 'react-rectangle';
import styles from './size.styl';

/* eslint-disable react/prop-types */
class Size extends React.Component {
  constructor(props) {
    super(props);
    const { width, height, maxWidth, maxHeight, onChange, ...rest } = props;
    this.rest = rest;
  }

  state = {
    width: this.props.width,
    height: this.props.height,
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ width: nextProps.width, height: nextProps.height });
  }

  render() {
    return (
      <table styleName="table" {...this.rest}>
        <tbody>
        {
          _.map(_.range(this.props.maxHeight), row => (
            <tr key={row}>
            {
              _.map(_.range(this.props.maxWidth), column => (
                <td
                  key={column}
                  onClick={() => this.props.onChange({ width: this.state.width, height: this.state.height })}
                  onMouseEnter={() => this.setState({ width: column + 1, height: row + 1 })}
                  onMouseLeave={() => this.setState({ width: this.props.width, height: this.props.height })}
                  styleName="td"
                >
                  <Paper
                    rounded={false}
                    zDepth={2}
                  >
                    <Square width="100%">
                      <div
                        styleName={`${row < this.state.height && column < this.state.width ? '' : 'not-'}selected`}
                      />
                    </Square>
                  </Paper>
                </td>
              ))
            }
            </tr>
          ))
        }
        </tbody>
      </table>
    );
  }
}
/* eslint-enable */

export default CSSModules(Size, styles);
