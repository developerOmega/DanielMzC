import Server from './server/server';
import { Request, Response } from 'express';

import bodyParser = require('body-parser');

const port = 3000;
const server = Server.init(port);

server.app.use(bodyParser.urlencoded( {extended: false} ));
server.app.use(bodyParser.json());

server.app.get('/', (req: Request, res: Response) => {
  res.status(200).send("Hola mundo");
})

export { server };
