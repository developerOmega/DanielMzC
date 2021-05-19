import { Request, Response } from 'express';

export default class BlogController {
  public index(req: Request, res: Response) {
    res.render('blogs/index', {
      titlePage: "Blogs"
    })
  }

  public show(req: Request, res: Response) {
    let id:any = req.params.id;
    
    res.render('blogs/show', {
      titlePage: `blog ${id} `
    });
  }
}