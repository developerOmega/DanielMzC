import { Request, Response } from 'express';

export default class HomeController {
  public index(req: Request, res: Response) {
    res.render('home', {
      layout: 'layouts/main',
      titlePage: "Home"
    });
  }
}