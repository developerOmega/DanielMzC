import { Request, Response } from "express";
import Project from '../../Models/Project';
import { ProjectData } from "../../interfaces/Models";

export default class ProjectController {

  public async index(req: Request, res: Response) {
    try {
      
      const projects = await Project.all();

      res.render('admin_panel/projects/index', {
        titlePage: "Sliders",
        projects
      })

    } catch (error) {
      res.redirect('back', 500);
    }
  }

  public async show(req: Request, res:  Response) {
    let id:number = parseInt(req.params.id);

    try {
      const project = await Project.byId(id);
      
      if(!project.id) {
        return res.redirect('back', 400);
      }

      return res.render('admin_panel/projects/show', {
        titlePage: project.title,
        project
      });

    } catch (error) {
      res.redirect('back', 500);
    }
  }

  public new(req: Request, res: Response) {
    res.render('admin_panel/projects/new', {
      titlePage: "New project"
    });
  }

  public async create(req: Request, res: Response) {
    let body = <ProjectData> req.body;

    try {
      const params: ProjectData = {
        title: body.title,
        description: body.description,
        main_img: body.main_img,
        admin_id: body.admin_id
      }

      const project = await Project.create(params);

      if(!project.id){
        return res.redirect('back', 400);
      }

      return res.redirect(`/admin_panel/projects/show/${project.id}`, 201);     

    } catch (error) {
      res.redirect('back', 500)
    }
  }

  public async edit(req: Request, res: Response) {
    let id:number = parseInt(req.params.id);

    try {

      const project = await Project.byId(id);

      if(!project.id) {
        return res.redirect('back', 404)
      }

      return res.render('admin_panel/projects/edit', {
        titlePage: project.title,
        project
      });

    } catch (error) {
      return res.redirect('back', 500);
    }
  }

  public async update(req: Request, res: Response) {
    let id: number = parseInt(req.params.id);
    let body = req.body;
    try {
      
      const project = await Project.byId(id);
      
      if(!project) {
        return res.redirect('back', 404);
      }

      await project.update(body);

      return res.redirect(`/admin_panel/projects/show/${project.id}`, 201);

    } catch (error) {
      return res.redirect('back', 500)
    }
  }

  public async delete(req: Request, res: Response){
    let id: number = parseInt(req.params.id);
    
    try {
      const project = await Project.byId(id);
      
      if(!project) {
        return res.redirect('back', 404);
      }

      await project.delete();

      return res.redirect(`/admin_panel/projects`, 201);

    } catch (error) {
      return res.redirect('back', 500);
    }
  }

}