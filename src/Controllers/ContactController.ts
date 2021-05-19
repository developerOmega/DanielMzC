import { Request, Response } from 'express';

export default class ContactController {
  public index(req: Request, res: Response) {
    res.render('contact', {
      titlePage: "Contact"
    })
  }
}