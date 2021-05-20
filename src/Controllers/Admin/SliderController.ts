import { Request, Response } from "express";
import Slider from '../../Models/Slider';
import { SliderData } from "../../interfaces/Models";

export default class SliderController {

  public async index(req: Request, res: Response) {
    try {
      
      const sliders = await Slider.all();

      res.render('admin_panel/sliders/index', {
        titlePage: "Sliders",
        sliders
      })

    } catch (error) {
      res.redirect('back', 500);
    }
  }

  public async show(req: Request, res:  Response) {
    let id:number = parseInt(req.params.id);

    try {
      const slider = await Slider.byId(id);
      
      if(!slider.id) {
        return res.redirect('back', 400);
      }

      return res.render('admin_panel/sliders/show', {
        titlePage: `Slider ${slider.id}`,
        slider
      });

    } catch (error) {
      res.redirect('back', 500);
    }
  }

  public new(req: Request, res: Response) {
    res.render('admin_panel/sliders/new', {
      titlePage: "New Slider"
    });
  }

  public async create(req: Request, res: Response) {
    let body = <SliderData> req.body;

    try {
      const params: SliderData = {
        img: body.img,
        content: body.content,
        url: body.url,
        admin_id: body.admin_id
      }

      const slider = await Slider.create(params);

      if(!slider.id){
        return res.redirect('back', 400);
      }

      return res.redirect(`/admin_panel/sliders/show/${slider.id}`, 201);     

    } catch (error) {
      res.redirect('back', 500)
    }
  }

  public async edit(req: Request, res: Response) {
    let id:number = parseInt(req.params.id);

    try {

      const slider = await Slider.byId(id);

      if(!slider.id) {
        return res.redirect('back', 404)
      }

      return res.render('admin_panel/sliders/edit', {
        titlePage: `Edit Slider ${slider.id}`,
        slider
      });

    } catch (error) {
      return res.redirect('back', 500);
    }
  }

  public async update(req: Request, res: Response) {
    let id: number = parseInt(req.params.id);
    let body = req.body;
    try {
      
      const slider = await Slider.byId(id);
      
      if(!slider) {
        return res.redirect('back', 404);
      }

      await slider.update(body);

      return res.redirect(`/admin_panel/blogs/show/${slider.id}`, 201);

    } catch (error) {
      return res.redirect('back', 500)
    }
  }

  public async delete(req: Request, res: Response){
    let id: number = parseInt(req.params.id);
    
    try {
      const slider = await Slider.byId(id);
      
      if(!slider) {
        return res.redirect('back', 404);
      }

      await slider.delete();

      return res.redirect(`/admin_panel/blogs`, 201);

    } catch (error) {
      return res.redirect('back', 500);
    }
  }

}