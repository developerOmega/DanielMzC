const fs = require('fs');

// ====================================
// Puerto
// ====================================
const port:number|string = process.env.PORT || 3000;

// ====================================
// Entorno
// ====================================
const nodeEnv:string = process.env.NODE_ENV || 'development';

// ====================================
// Entorno de Dropbox
// ====================================
const dropboxEnv = nodeEnv === 'development' || 'test' ? fs.readFileSync('keys/dropbox.key', 'utf8') : process.env.DROPBOX || ''; 

// ====================================
// Session Confog
// ====================================
class SessionConf {
  static secret: string = nodeEnv === 'development' || "test" ? fs.readFileSync('keys/session.key', 'utf8') : process.env.SESSION_SECRET || '';
   
  static maxAge: number = 2 * 24 * 60 * 60 * 1000; // 48h
}

// ====================================
// JsonWebToken
// ====================================
class JwtEnv {

  static signOptions:object = {
    issuer:  'Mysoft corp',
    subject:  'some@user.com',
    audience:  'http://mysoftcorp.in',
    expiresIn:  "48h",
    algorithm:  "RS256"
  };

  static verifyOptions:object = {
    issuer:  'Mysoft corp',
    subject:  'some@user.com',
    audience:  'http://mysoftcorp.in',
    expiresIn:  "48h",
    algorithm:  ["RS256"]
  };

  static publicKey:string = nodeEnv === 'development' || "test" ? fs.readFileSync('keys/public.key', 'utf8') : (<any>process.env.PUBLICAD_KEY).replace(/\\n/gm, '\n') || '';
  static privateKey:string = nodeEnv === 'development' || "test" ? fs.readFileSync('keys/private.key', 'utf8') : (<any>process.env.PRIVATEAD_KEY).replace(/\\n/gm, '\n' || '');
   
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
  port, nodeEnv, SessionConf, DatabaseEnv, dropboxEnv, JwtEnv
};