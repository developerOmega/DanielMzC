import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from '../../Models/Admin';
import { JwtEnv } from '../../config/config';
import { db } from '../../db/db';

afterAll(async () => {
  await db.connection.end();
});

export default class LoginController {

  public index(req: Request, res: Response) {
    res.render('admin_panel/login/index');
  }

  public async create(req: Request, res: Response) {
    let body = req.body;
    
    try {
      const admin = await Admin.byEmail(body.email);
      
      if(!admin) {
        return res.redirect('back', 404);
      }

      if(!bcrypt.compareSync(body.password, admin.password)){
        return res.redirect('back', 401);
      }

      const token = jwt.sign({admin}, JwtEnv.privateKey, JwtEnv.signOptions );

      req.session.admin = admin;
      req.session.token = token;

      return res.redirect('/admin_panel/blogs', 201);


    } catch (error) {
      return res.redirect('back', 500);
    }
  }

  public async delete(req: Request, res: Response) {
    req.session.destroy(() => {});
    res.redirect('/', 201);
  }

}
