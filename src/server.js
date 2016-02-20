import path from 'path';
import 'babel-polyfill';
import Koa from 'koa';
import send from 'koa-send';
const app = new Koa();

app.use(async (ctx, next) => {
  console.log(ctx.path);
  if (ctx.path === '/bundle.js' || ctx.path === '/bundle.css') {
    await send(ctx, ctx.path, { root: __dirname });
  } else if (ctx.path === '/favicon.ico') {
    await send(ctx, ctx.path, { root: path.join(__dirname, '..', 'assets') });
  } else {
    await next();
  }
});

app.use(async (ctx) => {
  ctx.body =
`<!doctype html>
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="bundle.css" />
  </head>
  <body>
    <div id="app" />
    <script src="bundle.js"></script>
  </body>
</html>`;
});

const port = process.env.PORT || 8080;
app.listen(port, 'localhost', err => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://localhost:${port}`);
});
