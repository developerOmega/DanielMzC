import Model from './Model';
import { db } from '../db/db';
import { SliderData, ModelData } from '../interfaces/Models';

interface ModelAndSlider extends SliderData, ModelData {};

export default class Slider extends Model {
  protected _img:string;
  protected _content:string;
  protected _url?:string;
  protected _admin_id:number;

  static ins: Slider;
  static table: string = "sliders";

  constructor(slider:ModelAndSlider, table:string){
    super(slider, table);
    this._img = slider.img;
    this._content = slider.content;
    this._url = slider.url;
    this._admin_id = slider.admin_id;
  }

  // ======== GETTERS ==========

  public get img():string {
    return this._img;
  }

  public get content():string {
    return this._content;
  }

  public get url():string | undefined {
    return this._url;
  }

  public get admin_id():number {
    return this._admin_id;
  }

  // ===========================


  public async admin() {
    let data:any = await db.query(`
      SELECT admins.id, admins.name, admins.email, admins.password, admins.is_su_admin, admins.updated_at, admins.created_at FROM sliders 
      INNER JOIN admins ON sliders.admin_id=admins.id
      WHERE sliders.id = ?
    `, [this.id]);
    return data[0];
  }

}