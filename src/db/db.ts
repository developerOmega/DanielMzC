import PostgreSQL from './postgresql';
import { DatabaseEnv } from '../config/config';
import { DbConection } from '../interfaces/Connection';

// Parametros que almacenas las propiedades de coneccion a la base de datos de postgresql
const params:DbConection = {
  host: DatabaseEnv.host,
  user: DatabaseEnv.user,
  password: DatabaseEnv.password,
  database: DatabaseEnv.database,
  port: DatabaseEnv.port
}

// Inicializar instalcia con el metodo estatico de instance
const db = PostgreSQL.instance(params);

export { db };