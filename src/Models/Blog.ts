import Model from "./Model";
import {db} from '../db/db';
import { ModelData, BlogData } from '../interfaces/Models';

interface ModelAndBlog extends ModelData, BlogData {}

export default class Blog extends Model {
  protected _title:string;
  protected _description:string;
  protected _content:string;
  protected _main_img:string;
  protected _admin_id:number;

  static ins: Blog;
  static table: string = "blogs";

  constructor(blog: ModelAndBlog) {
    super(blog);
    this._title = blog.title;
    this._description = blog.description;
    this._content = blog.content;
    this._main_img = blog.main_img;
    this._admin_id = blog.admin_id;
  }

  // ========= GETTERS =========
  
  
  public get title():string {
    return this._title;
  }

  public get description():string {
    return this._description;
  }

  public get content():string {
    return this._content;
  }

  public get main_img():string {
    return this._main_img;
  }

  public get admin_id(): number {
    return this._admin_id;
  }
  
  
  // ===========================

  static async admin() {

  }
}