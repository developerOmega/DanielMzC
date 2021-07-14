import { Request, Response } from "express";
import Email from "../../Models/Email";
import { EmailData } from "../../interfaces/Models";

export default class EmailControllers {

  public async index(req: Request, res: Response) {
    try {
      
      const emails = await Email.all();

      res.render('admin_panel/emails/index', {
        layout: 'layouts/admin',
        titlePage: "Emails",
        emails
      })

    } catch (error) {
      return res.redirect('back');
    }
  }

  public async show(req: Request, res: Response) {
    let id:number = parseInt(req.params.id);

    try {  
      const email: Email = <Email> await Email.byId(id);

      if(!email.id) {
        return res.redirect('back');
      }

      return res.render('admin_panel/emails/show', {
        layout: 'layouts/admin',
        titlePage: email._to,
        email
      });

    } catch (error) {
      res.redirect('back');
    }
  }

  public async new(req: Request, res: Response) {
    res.render('admin_panel/emails/new', {
      layout: 'layouts/admin',
      titlePage: "New Email"
    });
  }

  public async create(req: Request, res: Response) {
    let body = <EmailData> req.body;

    try {
      const params: EmailData = {
        _from: "theskip98@gmail.com",
        _to: body._to,
        subject: body.subject,
        html: body.html,
        admin_id: req.session.admin.id
      }

      const email = await Email.create(params);

      if(!email.id){
        res.redirect('back');
      }

      return res.redirect(`/admin_panel/emails/show/${email.id}`);     

    } catch (error) {
      res.redirect('back');
    }
  }

  public async delete(req: Request, res: Response) {
    let id: number = parseInt(req.params.id);
    
    try {
      const email = <Email> await Email.byId(id);
      
      if(!email) {
        return res.redirect('back');
      }

      await email.delete();

      res.redirect(`/admin_panel/emails`);

    } catch (error) {
      res.redirect('back');

    }
  }

}