import {  Request, Response } from 'express';
import Project from '../Models/Project';

export default class ProjectController {
  public async index(req: Request, res: Response) {
    try {

      const projects = await Project.all();

      res.render('projects/index', {
        layout: 'layouts/main',
        titlePage: "Projects",
        projects
      });
    } catch (error) {
      return res.redirect('error_500')
    }
    
  }

  public show(req: Request, res: Response) {
    let id = req.params.id;
    res.render('projects/show', {
      layout: 'layouts/main',
      titlePage: `project ${id}`
    })
  }
}
