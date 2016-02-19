import CSSModules from 'react-css-modules';
import Paper from 'material-ui/lib/paper';
import React from 'react';
import styles from './drop-down.styl';

const Dropdown = ({ header, isOpen, onChange, children, ...rest }) => (
  <Paper
    rounded={false}
    zDepth={2}
    {...rest}
  >
    <div
      onClick={e => {
        e.preventDefault();
        onChange(!isOpen);
      }}
      styleName={`header-${isOpen ? 'open' : 'closed'}`}
    >
      {header}
    </div>
    <div
      styleName={`content-${isOpen ? 'open' : 'closed'}`}
    >
      {children}
    </div>
  </Paper>
);

export default CSSModules(Dropdown, styles);
