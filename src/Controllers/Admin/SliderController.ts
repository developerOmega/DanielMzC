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
      res.redirect(500, 'back');
    }
  }

  public async show(req: Request, res:  Response) {
    let id:number = parseInt(req.params.id);

    try {
      const slider = await Slider.byId(id);
      
      if(!slider.id) {
        return res.redirect(400, 'back');
      }

      return res.render('admin_panel/sliders/show', {
        titlePage: `Slider ${slider.id}`,
        slider
      });

    } catch (error) {
      res.redirect(500, 'back');
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
        admin_id: req.session.admin.id
      }

      const slider = await Slider.create(params);

      if(!slider.id){
        return res.redirect('back');
      }

      return res.redirect(`/admin_panel/sliders/show/${slider.id}`);     

    } catch (error) {
      res.redirect('back')
    }
  }

  public async edit(req: Request, res: Response) {
    let id:number = parseInt(req.params.id);

    try {

      const slider = await Slider.byId(id);

      if(!slider.id) {
        return res.redirect('back')
      }

      return res.render('admin_panel/sliders/edit', {
        titlePage: `Edit Slider ${slider.id}`,
        slider
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
      
      const slider = await Slider.byId(id);
      
      if(!slider) {
        return res.redirect('back');
      }

      await slider.update(body);

      return res.redirect(`/admin_panel/blogs/show/${slider.id}`);

    } catch (error) {
      return res.redirect('back')
    }
  }

  public async delete(req: Request, res: Response){
    let id: number = parseInt(req.params.id);
    
    try {
      const slider = await Slider.byId(id);
      
      if(!slider) {
        return res.redirect('back');
      }

      await slider.delete();

      return res.redirect(`/admin_panel/blogs`);

    } catch (error) {
      return res.redirect('back');
    }
  }

}