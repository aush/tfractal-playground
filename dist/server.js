'use strict';

require('babel-polyfill');

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaSend = require('koa-send');

var _koaSend2 = _interopRequireDefault(_koaSend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var app = new _koa2.default();

app.use(function () {
  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(ctx.path);

            if (!(ctx.path === '/bundle.js' || ctx.path === '/bundle.css')) {
              _context.next = 6;
              break;
            }

            _context.next = 4;
            return (0, _koaSend2.default)(ctx, ctx.path, { root: __dirname });

          case 4:
            _context.next = 8;
            break;

          case 6:
            _context.next = 8;
            return next();

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })),
      _this = undefined;

  return function (_x, _x2) {
    return ref.apply(_this, arguments);
  };
}());

app.use(function () {
  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(ctx) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            ctx.body = '<!doctype html>\n<html>\n  <head>\n    <link rel="stylesheet" type="text/css" href="bundle.css" />\n  </head>\n  <body>\n    <div id="app" />\n    <script src="bundle.js"></script>\n  </body>\n</html>';

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })),
      _this = undefined;

  return function (_x3) {
    return ref.apply(_this, arguments);
  };
}());

var port = process.env.PORT;
app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:' + port);
});
