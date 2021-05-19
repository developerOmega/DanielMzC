import { Request, Response } from 'express';

export default class MeController {
  public index(req: Request, res: Response) {
    res.render('me', {
      titlePage: "Me"
    })
  }
}