import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import Admin from '../../Models/Admin';

export default class LoginController {

  public index(req: Request, res: Response) {
    res.render('admin_panel/login/index', {
      layout: 'layouts/main'
    });
  }

  public async create(req: Request, res: Response) {
    let body = req.body;
    
    try {
      const admin = await Admin.byEmail(body.email);
      
      if(!admin) {
        return res.redirect('back');
      }

      if(!bcrypt.compareSync(body.password, admin.password)){
        return res.redirect('back');
      }

      const adminData = {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        password: admin.password,
        is_su_admin: admin.is_su_admin,
        updated_at: admin.updated_at,
        created_at: admin.created_at,
      }

      req.session.admin = adminData;

      return res.redirect('/admin_panel/admins');

    } catch (error) {
      return res.redirect('back');
    }
  }

  public async delete(req: Request, res: Response) {
    req.session.destroy(() => {});
    res.redirect('/');
  }

}
