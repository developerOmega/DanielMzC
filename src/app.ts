import Server from './server/server';
import addRouter from './Routes';
import fileUpload from 'express-fileupload';

import bodyParser = require('body-parser');
import hbs = require('hbs');
import path = require('path')
import session = require('express-session');

import { SessionConf, port } from './config/config';

const server = Server.init(port);

server.app.use(bodyParser.urlencoded( {extended: false} ));
server.app.use(bodyParser.json());

server.app.use( fileUpload( {useTempFiles: false} ) )

const pathPartial = path.resolve(__dirname, '../views/partials')
hbs.registerPartials(pathPartial);

server.app.set('view engine', 'hbs');

// Session express
server.app.use(session({
  secret: SessionConf.secret,
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: SessionConf.maxAge
  }
}))

addRouter();

export { server };
