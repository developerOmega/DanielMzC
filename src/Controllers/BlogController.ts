import { Request, Response } from 'express';

export default class BlogController {
  public index(req: Request, res: Response) {
    res.render('blogs/index', {
      layout: 'layouts/main',
      titlePage: "Blogs"
    })
  }

  public show(req: Request, res: Response) {
    let id:any = req.params.id;
    
    res.render('blogs/show', {
      layout: 'layouts/main',
      titlePage: `blog ${id}`
    });
  }
}