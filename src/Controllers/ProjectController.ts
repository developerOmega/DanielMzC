import {  Request, Response } from 'express';

export default class ProjectController {
  public index(req: Request, res: Response) {
    res.render('projects/index', {
      layout: 'layouts/main',
      titlePage: "Projects"
    })
  }

  public show(req: Request, res: Response) {
    let id = req.params.id;
    res.render('projects/show', {
      layout: 'layouts/main',
      titlePage: `project ${id}`
    })
  }
}
