import {Request, Response} from 'express';
import Admin from '../../../Models/Admin';
import jwt = require('jsonwebtoken');
import  bcrypt = require('bcrypt');

import { JwtEnv } from '../../../config/config';

export default class AdminAuthController {
  public async login(req:  Request, res: Response){
    let body = req.body;
    try {
      let admin = await Admin.byEmail(body.email);

      if(!admin){
        return res.status(401).json({
          ok: false,
          err: {
            message: "El (email) y contraseña son incorrectos"
          }
        });
      }

      if(!bcrypt.compareSync(body.password, admin.password) ){
        return res.status(401).json({
          ok: false,
          err: {
            message: "El email y (contraseña) son incorrectos"
          }
        });
      }

      const token = jwt.sign({admin}, JwtEnv.privateKey, JwtEnv.signOptions );

      return res.status(200).json({
        ok: true,
        admin,
        token
      })

    } catch (err) {
      return res.status(500).json({
        ok: false,
        err
      })
    }
  }
}
