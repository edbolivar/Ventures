const express = require('express');
// const spdy = require('spdy');
const helmet = require('helmet');
const morgan = require('morgan');
const compress = require('compression');
const cookieParser = require('cookie-parser');
const router = require('./back-end/routes');
const app = require('./nextExport');
require('./config/keys');

helmet.hsts({
  // ...
  setIf() {
    return process.env.NODE_ENV === 'production';
  },
});

// morgan logging function
const skipMiscLogging = req => {
  const isNextRelated =
    req.url.includes('/_next/on-demand-entries-ping') ||
    req.url.includes('/_next/webpack-hmr');
  if (isNextRelated) return true;
  return false;
};

app
  .prepare()
  .then(() => {
    const server = express();

    server.set('host', process.env.HOST);
    server.set('port', process.env.PORT);

    // sets some security minded headers
    server.use(helmet());
    server.use(compress());
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));
    server.use(cookieParser());

    server.use(morgan('dev', { skip: skipMiscLogging }));

    server.use(router);

    server.listen(server.get('port'), err => {
      if (err) throw err;
      console.log(
        `> Ready on port http://${server.get('host')}:${server.get('port')}`
      );
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
