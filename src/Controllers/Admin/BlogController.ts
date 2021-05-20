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
      res.redirect('back', 500);
    }
  }

  public async show(req: Request, res:  Response) {
    let id:number = parseInt(req.params.id);

    try {
      const blog = await Blog.byId(id);
      
      if(!blog.id) {
        return res.redirect('back', 400);
      }

      return res.render('admin_panel/blogs/show', {
        titlePage: blog.title,
        blog
      });

    } catch (error) {
      res.redirect('back', 500);
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

      const blog = await Blog.create(params);

      if(!blog.id){
        return res.redirect('back', 400);
      }

      return res.redirect(`/admin/blogs/show/${blog.id}`, 201);     

    } catch (error) {
      res.redirect('back', 500)
    }
  }

  public async edit(req: Request, res: Response) {
    let id:number = parseInt(req.params.id);

    try {

      const blog = await Blog.byId(id);

      if(!blog.id) {
        return res.redirect('back', 404)
      }

      return res.render('admin_panel/blogs/edit', {
        titlePage: blog.title,
        blog
      });

    } catch (error) {
      return res.redirect('back', 500);
    }
  }

  public async update(req: Request, res: Response) {
    let id: number = parseInt(req.params.id);
    let body = req.body;
    try {
      
      const blog = await Blog.byId(id);
      
      if(!blog) {
        return res.redirect('back', 404);
      }

      await blog.update(body);

      return res.redirect(`/admin/blogs/show/${blog.id}`, 201);

    } catch (error) {
      return res.redirect('back', 500)
    }
  }

  public async delete(req: Request, res: Response){
    let id: number = parseInt(req.params.id);
    
    try {
      const blog = await Blog.byId(id);
      
      if(!blog) {
        return res.redirect('back', 404);
      }

      await blog.delete();

      return res.redirect(`/admin/blogs`, 201);

    } catch (error) {
      return res.redirect('back', 500);
    }
  }

}