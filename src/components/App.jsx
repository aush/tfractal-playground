import 'babel-polyfill';
import _ from 'lodash';
import Configurator from './configurator';
import CSSModules from 'react-css-modules';
import LocationHash from './location-hash';
import Paper from 'material-ui/lib/paper';
import React from 'react';
import styles from './App.styl';
import Tfractal from 'react-tfractal';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  encodeConfiguration,
  normalizeConfiguration,
} from '../common/configuration-utils';
import {
  changeColorMap,
  changeLayers,
  changePalette,
  changeSize,
  generateRandom,
} from '../redux/ducks/configuration';
import {
  openLayers,
  openPalette,
  openSize,
} from '../redux/ducks/ui';

/* eslint-disable react/prop-types */
class App extends React.Component {
  render() {
    return (
      <Paper
        rounded={false}
        style={{ ...this.props.style }}
        styleName="tfractal-paper"
        zDepth={5}
      >
        <LocationHash
          value={encodeConfiguration(this.props.configuration)}
        />
        <Tfractal
          styleName="tfractal"
          {...normalizeConfiguration(this.props.configuration)}
        >
          <div
            onClick={() => this.props.generateRandom()}
            styleName="random"
          />
          <Paper
            rounded={false}
            styleName="configurator-paper"
            zDepth={5}
          >
            <Configurator
              {...this.props.configuration}
              {...this.props.ui}
              changeColorMap={this.props.changeColorMap}
              changeLayers={this.props.changeLayers}
              changePalette={this.props.changePalette}
              changeSize={this.props.changeSize}
              openLayers={this.props.openLayers}
              openPalette={this.props.openPalette}
              openSize={this.props.openSize}
            />
          </Paper>
        </Tfractal>
      </Paper>
    );
  }
}
/* eslint-enable */

export default connect(
  state => ({
    configuration: state.configuration,
    ui: state.ui,
  }),
  dispatch => bindActionCreators({
    changeColorMap,
    changeLayers,
    changePalette,
    changeSize,
    generateRandom,
    openLayers,
    openPalette,
    openSize,
  }, dispatch))(
    CSSModules(App, styles));
