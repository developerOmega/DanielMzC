import Server from './server/server';
import addRouter from './Routes';
import fileUpload from 'express-fileupload';

import bodyParser = require('body-parser');
import hbs = require('hbs');
import path = require('path')
import session = require('express-session');
import methodOverride = require('method-override');

import { SessionConf, port } from './config/config';

const server = Server.init(port);

server.app.use(bodyParser.urlencoded( {extended: false} ));
server.app.use(bodyParser.json());

server.app.use( fileUpload( {useTempFiles: false} ) )

const pathPartial = path.resolve(__dirname, '../views/partials')
hbs.registerPartials(pathPartial);

server.app.set('view engine', 'hbs');

// override with the X-HTTP-Method-Override header in the request
server.app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    const method = req.body._method
    delete req.body._method
    return method
  }
}))

// Session express
server.app.use(session({
  secret: SessionConf.secret,
  resave: true,
  saveUninitialized: true,
  // unset: 'destroy',
  cookie: {
    maxAge: SessionConf.maxAge,
    // secure: true
  }
}));

addRouter();

export { server };
