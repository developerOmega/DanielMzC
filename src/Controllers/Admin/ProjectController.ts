import { Request, Response } from "express";
import Project from '../../Models/Project';
import { ProjectData } from "../../interfaces/Models";

export default class ProjectController {

  public async index(req: Request, res: Response) {
    try {
      
      const projects = await Project.all();

      res.render('admin_panel/projects/index', {
        layout: 'layouts/admin',
        titlePage: "Sliders",
        projects
      })

    } catch (error) {
      res.redirect('back');
    }
  }

  public async show(req: Request, res:  Response) {
    let id:number = parseInt(req.params.id);

    try {
      const project = await Project.byId(id);
      
      if(!project.id) {
        return res.redirect('back');
      }

      const sections = await project.sections();

      return res.render('admin_panel/projects/show', {
        layout: 'layouts/admin',
        titlePage: project.title,
        project,
        sections,
      });

    } catch (error) {
      res.redirect('back');
    }
  }

  public new(req: Request, res: Response) {
    res.render('admin_panel/projects/new', {
      layout: 'layouts/admin',
      titlePage: "New project"
    });
  }

  public async create(req: Request, res: Response) {
    let body = <ProjectData> req.body;

    try {
      const params: ProjectData = {
        title: body.title,
        description: body.description,
        admin_id: req.session.admin.id
      }

      const project = await Project.create(params);

      if(!project.id){
        return res.redirect('back');
      }

      return res.redirect(`/admin_panel/projects/show/${project.id}`);     

    } catch (error) {
      res.redirect('back')
    }
  }

  public async edit(req: Request, res: Response) {
    let id:number = parseInt(req.params.id);

    try {

      const project = await Project.byId(id);

      if(!project.id) {
        return res.redirect('back')
      }

      return res.render('admin_panel/projects/edit', {
        layout: 'layouts/admin',
        titlePage: project.title,
        project
      });

    } catch (error) {
      return res.redirect('back');
    }
  }

  public async update(req: Request, res: Response) {
    let id: number = parseInt(req.params.id);
    let body = req.body;

    delete body.admin_id
    try {
      
      const project = await Project.byId(id);
      
      if(!project) {
        return res.redirect('back');
      }

      await project.update(body);

      return res.redirect(`/admin_panel/projects/show/${project.id}`);

    } catch (error) {
      return res.redirect('back')
    }
  }

  public async delete(req: Request, res: Response){
    let id: number = parseInt(req.params.id);
    
    try {
      const project = await Project.byId(id);
      
      if(!project) {
        return res.redirect('back');
      }

      await project.delete();

      return res.redirect(`/admin_panel/projects`);

    } catch (error) {
      return res.redirect('back');
    }
  }

}