import { Request, Response } from "express";
import Section from '../../../Models/Section';
import { SectionData } from "../../../interfaces/Models";

export default class SectionController {

  public async index(req: Request, res: Response) {
    try {
      
      const sections = await Section.all();

      return res.status(200).json({
        ok: true,
        sections
      })

    } catch (err) {
      return res.status(500).json({
        ok: false,
        err
      })
    }
  }

  public async show(req: Request, res:  Response) {
    let id:number = parseInt(req.params.id);

    try {
      const section = await Section.byId(id);
      
      if(!section.id) {
        return res.status(404).json({
          ok: false,
          err: {
            message: "No se encontro la seccion"
          }
        });
      }

      return res.status(200).json({
        ok: true,
        section
      })

    } catch (err) {
      res.status(500).json({
        ok: false,
        err
      });
    }
  }

  public async create(req: Request, res: Response) {
    let body = <SectionData> req.body;

    try {
      const params: SectionData = {
        content: body.content,
        project_id: body.project_id
      }

      const section = await Section.create(params);

      if(!section.id){
        return res.status(400).json({
          ok: false, 
          err: {
            message: "La seccion no se puedo creear"
          }
        });
      }

      return res.status(200).json({
        ok: true,
        section
      });     

    } catch (err) {
      return res.status(500).json({
        ok: false,
        err
      })
    }
  }

  public async update(req: Request, res: Response) {
    let id: number = parseInt(req.params.id);
    let body = req.body;

    delete body.project_id;
    try {
      
      const sectionData = await Section.byId(id);
      
      if(!sectionData) {
        return res.status(404).json({
          ok: false,
          err: {
            message: "No pudo encontrar la seccion"
          }
        });
      }

      const section = await sectionData.update(body);

      return res.status(200).json({
        ok: true,
        section
      });

    } catch (err) {
      return res.status(500).json({
        ok: false,
        err
      })
    }
  }

  public async delete(req: Request, res: Response){
    let id: number = parseInt(req.params.id);
    
    try {
      const section = await Section.byId(id);
      
      if(!section) {
        return res.status(404).json({
          ok: false,
          err: {
            message: "No pudo encontrar la seccion"
          }
        });
      }

      await section.delete();

      return res.status(200).json({
        ok: true,
        message: "La seccion se ha eliminado con exito"
      });

    } catch (err) {
      return res.status(500).json({
        ok: false,
        err
      })
     }
  }

}
