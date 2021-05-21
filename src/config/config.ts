const fs = require('fs');

// ====================================
// Puerto
// ====================================
const port:number|string = process.env.PORT || 4000;

// ====================================
// Entorno
// ====================================
const nodeEnv:string = process.env.NODE_ENV || 'development';

// ====================================
// Entorno de Dropbox
// ====================================
const dropboxEnv = nodeEnv === 'development' ? fs.readFileSync('keys/dropbox.key', 'utf8') : process.env.DROPBOX || ''; 

// ====================================
// Session Confog
// ====================================
class SessionConf {
  
}

// ====================================
// Base de datos
// ====================================

class DatabaseEnv {
  static host:string = nodeEnv === 'development' || "test" ? 'localhost' : process.env.HOST || '';
  static user:string = nodeEnv === 'development' || "test" ? 'postgres' : process.env.USER || '';
  static password :string= nodeEnv === 'development' || "test" ? '1234' : process.env.PASSWORD || '';
  static database:string = nodeEnv === 'development' || "test" ? 'danielmzc' : process.env.DATABASE || '';
  static port:string = nodeEnv === 'development' || "test" ? '5432' : process.env.PORTDB || '';
  static node:string = nodeEnv;
}


export { 
  port, nodeEnv, SessionConf, DatabaseEnv, dropboxEnv
};