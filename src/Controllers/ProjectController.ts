import {  Request, Response } from 'express';
import Project from '../Models/Project';
import Section from '../Models/Section';

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

  public async show(req: Request, res: Response) {
    let id:number = parseInt(req.params.id);

    try {
      const project: any = await Project.byId(id);
      const sections = await Section.byProjectId(id);

      res.render('projects/show', {
        layout: 'layouts/main',
        titlePage: project.title,
        project,
        sections
      });

    } catch (error) {
      return res.redirect('error_500')
    }
  }
}
