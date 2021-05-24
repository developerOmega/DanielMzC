import { Request, Response } from "express";
import Blog from '../../Models/Blog';
import { BlogData } from "../../interfaces/Models";

export default class BlogController {

  public async index(req: Request, res: Response) {
    try {
      
      const blogs = await Blog.all();

      res.render('admin_panel/blogs/index', {
        titlePage: "Sliders",
        blogs
      })

    } catch (error) {
      return res.redirect('back');
    }
  }

  public async show(req: Request, res:  Response) {
    let id:number = parseInt(req.params.id);

    try {
      const blog = await Blog.byId(id);
      
      if(!blog.id) {
        return res.redirect('back');
      }

      return res.render('admin_panel/blogs/show', {
        titlePage: blog.title,
        blog
      });

    } catch (error) {
      res.redirect('back');
    }
  }

  public new(req: Request, res: Response) {
    res.render('admin_panel/blogs/new', {
      titlePage: "New Blog"
    });
  }

  public async create(req: Request, res: Response) {
    let body = <BlogData> req.body;

    try {
      const params: BlogData = {
        title: body.title,
        description: body.description,
        content: body.content,
        main_img: body.main_img,
        admin_id: body.admin_id
      }

      console.log(params);

      const blog = await Blog.create(params);

      console.log(blog);


      if(!blog.id){
        res.redirect('back');

      }

      return res.redirect(`/admin_panel/blogs/show/${blog.id}`);     

    } catch (error) {
      res.redirect('back');
    }
  }

  public async edit(req: Request, res: Response) {
    let id:number = parseInt(req.params.id);

    try {

      const blog = await Blog.byId(id);

      if(!blog.id) {
        return res.redirect('back')
      }

      return res.render('admin_panel/blogs/edit', {
        titlePage: blog.title,
        blog
      });

    } catch (error) {
      return res.redirect('back');
    }
  }

  public async update(req: Request, res: Response) {
    let id: number = parseInt(req.params.id);
    let body = req.body;

    delete body.admin_id;
    
    try {
      
      const blog = await Blog.byId(id);
      
      if(!blog) {
        return res.redirect('back');
      }

      await blog.update(body);

      res.redirect(`/admin_panel/blogs/show/${blog.id}`);


    } catch (error) {
      res.redirect('back')

    }
  }

  public async delete(req: Request, res: Response){
    let id: number = parseInt(req.params.id);
    
    try {
      const blog = await Blog.byId(id);
      
      if(!blog) {
        return res.redirect('back');
      }

      await blog.delete();

      res.redirect(`/admin_panel/blogs`);


    } catch (error) {
      res.redirect('back');

    }
  }

}