import { Request, Response } from "express";
import Email from "../../Models/Email";
import { EmailData } from "../../interfaces/Models";
import { transporter } from '../../config/mailer';
import fs = require('fs');

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

      // Mandar mail
      await transporter.sendMail({
        from: req.session.admin.email, // sender address
        to: body._to, // list of receivers
        subject: body.subject, // Subject line
        html: body.html == "" ? fs.readFileSync('emails/publicity.html', 'utf8') : body.html, // html body
      });

      // Separar parametro _to por comas en un array
      const list = body._to.split(',')

      // Recorrer lista de destinatarios; crear un registro para cada destinatario
      list.forEach( async (__to) => {
        
        const params: EmailData = {
          _from: req.session.admin.email,
          _to: __to.trim(), // trim() ----> Elimina espacios en blanco
          subject: body.subject,
          html: body.html,
          admin_id: req.session.admin.id
        }
  
        const email = await Email.create(params);

        if(!email.id){
          return res.redirect('back');
        }

      });


      return res.redirect(`/admin_panel/emails`);     

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