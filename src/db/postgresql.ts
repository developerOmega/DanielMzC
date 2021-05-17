const { Client } = require('pg');
import { QueryResult } from 'pg';
import { DbConection } from '../interfaces/Connection';

// Clase para correr coneccion de postgresql
export default class PostgreSQL {
  
  // Definir propiedades de la coneccion
  public connection: any;
  private host:string;
  private user:string;
  private password:string;
  private database:string;
  private port:string;

  private static _instance: PostgreSQL;

  // Ejecutar constructor para inicializar instancia
  constructor(data:DbConection) {
    this.host = data.host;
    this.user = data.user;
    this.password = data.password;
    this.database = data.database;
    this.port = data.port;

    this.init();
  }

  // Metodo que inicializa coneccion a Pgsql
  private init() {
    this.connection = new Client({
      host: this.host,
      user: this.user,
      password: this.password,
      database: this.database,
      port: this.port,
      ssl: { rejectUnauthorized: false }
    });

    this.connection.connect();
  }

  // Inicializar instancia
  public static instance(data:DbConection) {
    return this._instance || ( this._instance = new this(data) );
  }
}