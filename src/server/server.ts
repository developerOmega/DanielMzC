import express = require('express');
import path = require('path')
import addInitializer from '../Initializers';

export default class Server {
  public app:express.Application;
  public port:number;

  constructor(port:any) {
    this.port = port;
    this.app = express();
  }

  static init( port:any ) {
    return new Server( port );
  }

  private publicPath() {
    const publicPath = path.resolve(__dirname, '../../public');
    this.app.use(express.static(publicPath));
  }
  

  public async start( callback: Function ){
    this.app.listen(this.port, callback(this.port));
    this.publicPath();
    await addInitializer();
  }

}