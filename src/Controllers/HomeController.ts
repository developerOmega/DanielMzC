import { Request, Response } from 'express';
import Slider from '../Models/Slider';
import Project from '../Models/Project';
import Blog from '../Models/Blog';

export default class HomeController {
  public async index(req: Request, res: Response) {

    try {
      const sliders = await Slider.all();
      const projects = await Project.all();
      const blogs = await Blog.paginate(1, 3, "DESC");
      const blog = await Blog.last();

      res.render('home', {
        layout: 'layouts/main',
        titlePage: "Home",
        sliders,
        projects, 
        blogs,
        blog
      });
    } catch (error) {
      res.redirect('/error_500')
    }

  }
}