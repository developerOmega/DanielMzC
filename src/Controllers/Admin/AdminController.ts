import { Request, Response } from 'express';
import { AdminData } from '../../interfaces/Models';
import Admin from '../../Models/Admin';

import bcrypt from 'bcrypt';

export default class AdminController {
  public async index(req: Request, res: Response) {
    try {

      let admins = await Admin.all();

      res.render('admin_panel/admins/index', {
        layout: 'layouts/admin',
        titlePage: "Admins",
        admins
      });


    } catch (err) {
      res.redirect("back");
    }

  }

  public async show(req: Request, res: Response) {
    let id:any = parseInt(req.params.id);

    try {
      let admin = await Admin.byId(id);

      if(!admin.id && parseInt(id)) {
        res.redirect("back");
      }

      res.render('admin_panel/admins/show', {
        layout: 'layouts/admin',
        titlePage: admin.name,
        admin
      });

    } catch (error) {
      res.redirect("back");
    }

  }

  public new(req: Request, res: Response) {
    res.render('admin_panel/admins/new', {
      layout: 'layouts/admin',
      titlePage: "New Admin"
    });
  }

  public async create(req: Request, res: Response) {
    let body = <AdminData> req.body;

    try {
      const params: AdminData = {
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        is_su_admin: body.is_su_admin
      }

      let admin = await Admin.create(params);
      
      if(!admin.id){
        return res.redirect('back');
      }

      return res.redirect(`/admin_panel/admins/show/${admin.id}`)

    } catch (err) {
      res.redirect('back')
    }
  }

  public async edit(req: Request, res: Response) {
    let id:any = req.params.id;
    try {

      let admin = await Admin.byId(id);

      if(!admin.id) {
        res.redirect("back");
      }
      
      res.render('admin_panel/admins/edit', {
        layout: 'layouts/admin',
        titlePage: admin.name,
        admin
      });
    } catch (error) {
      res.redirect("back")     
    }
 
  }

  public async update(req: Request, res: Response) {
    let id:number = parseInt(req.params.id);
    let body = req.body;

    body = delete body.password;
  
    try {
      let admin = await Admin.byId(id);
      
      if(!admin){
        return res.redirect('back');
      }

      await admin.update(body);
      return res.redirect(`/admin_panel/admins/show/${admin.id}`);

    } catch (error) {
      res.redirect('back');
    }
  }

  public async delete(req: Request, res: Response) {
    let id:number = parseInt(req.params.id);
    
    try {
      
      let admin = await Admin.byId(id)
      
      if(!admin){
        return res.redirect('back');
      }
      
      await admin.delete();
      return res.redirect('/admin_panel/admins')
    
    } catch (error) {
      res.redirect(500, 'back');
    }
  }
}