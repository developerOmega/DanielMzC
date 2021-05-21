import Server from './server/server';
import addRouter from './Routes';
import fileUpload from 'express-fileupload';

import bodyParser = require('body-parser');
import hbs = require('hbs');
import path = require('path')

const port = 3000;
const server = Server.init(port);

server.app.use(bodyParser.urlencoded( {extended: false} ));
server.app.use(bodyParser.json());

server.app.use( fileUpload( {useTempFiles: false} ) )

const pathPartial = path.resolve(__dirname, '../views/partials')
hbs.registerPartials(pathPartial);

server.app.set('view engine', 'hbs');

addRouter();

export { server };
