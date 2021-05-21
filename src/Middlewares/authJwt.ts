import { Request, Response, NextFunction } from 'express';
import jwt = require('jsonwebtoken');
import { JwtEnv } from '../config/config';

// Middleware que valida el json web token de la sesion de usuarios
const authAdmin = (req: Request, res: Response, next: NextFunction) => {
  //  Busacr token del Header
  let token:string= req.get('Authorization') || '';

  // Ejecutar verificacion de jwt con los parametros de: token, llabe publica de usuarios y opciones de verificacion
  jwt.verify(token, JwtEnv.publicKey, JwtEnv.verifyOptions, (err:any, decode:any) => {

    // Si existe un error, retornar un json con error 401
    if(err){
      return res.status(401).json({
        ok: false,
        err: {
          name: err.name,
          message: err.message
        }
      });
    }
    
    // Agregar al parametro req.admin la informacion decodificada
    req.admin = decode.admin;
    next();
  });
}

export { authAdmin };