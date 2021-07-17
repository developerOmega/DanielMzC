import { Request, Response } from 'express';
import { transporter } from '../config/mailer';

export default class ContactController {
  public index(req: Request, res: Response) {
    res.render('contact', {
      layout: 'layouts/main',
      titlePage: "Contact"
    })
  }

  public async create(req: Request, res: Response) {
    let body = req.body;
    try {

      // Mandar mail
      await transporter.sendMail({
        from: `CLIENTE <theskip98@gmail.com>`, // sender address
        to: "theskip98@gmail.com", // list of receivers
        subject: this.strip(body.email), // Subject line
        html: `email: ${ this.strip(body.email) } <br>
              message: ${ this.strip(body.message) }` // html body
      });

      res.send("El email se envió exitosamente.");

    } catch (error) {
      res.send("Error: No se envió email." );
    }

  }

  protected strip(data:string):string {
    return data.replace(/(<([^>]+)>)/gi, "");
  }
}