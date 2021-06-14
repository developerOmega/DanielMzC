import { Request, Response } from 'express';
import Blog from '../Models/Blog';

export default class BlogController {
  
  public async index(req: Request, res: Response) {
    const init:any  = req.query.init;
    const end:any = req.query.end;

    try {
      const blogs = !init && !end ? 
          await Blog.paginate(1, 12, "DESC") : 
          await Blog.paginate(init, end);   

      res.render('blogs/index', {
        layout: 'layouts/main',
        titlePage: "Blogs",
        blogs
      });
    } catch (error) {
      return res.render('error_500')
    }
  }

  public async show(req: Request, res: Response) {
    let id:number = parseInt(req.params.id);

    try {      
      const blog:any = await Blog.byId(id)

      const blogs = await Blog.paginate(2, 3, "DESC");

      res.render('blogs/show', {
        layout: 'layouts/main',
        titlePage: blog.title,
        blog,
        blogs
      });
    } catch (error) {
      return res.render('error_500');
    }
  }
}