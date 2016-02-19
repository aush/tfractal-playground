import React from 'react';

export default ({ value }) => {
  if (document && document.location) {
    document.location.hash = `#${value}`;
  }

  return <noscript/>;
};
