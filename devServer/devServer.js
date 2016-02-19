const express = require('express');
const webpack = require('webpack');
const config = require('../webpack.config.dev');

const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/', (req, res) => {
  res.send(
`<!doctype html>
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="bundle.css" />
  </head>
  <body>
    <div id="app" />
    <script src="vendor.js"></script>
    <script src="bundle.js"></script>
  </body>
</html>`);
});

const port = process.env.PORT || 3000;
app.listen(port, 'localhost', err => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://localhost:${port}`);
});
