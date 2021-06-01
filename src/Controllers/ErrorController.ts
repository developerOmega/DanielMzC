import { Request, Response } from 'express'

export default class ErrorController {
  public _500(req: Request, res: Response) {
    res.render('error_500', {
      titlePage: "Error 500"
    });
  }
}