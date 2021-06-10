import Model from "./Model";
import {db} from '../db/db';
import { ModelData, BlogData } from '../interfaces/Models';

interface ModelAndBlog extends ModelData, BlogData {}

export default class Blog extends Model {
  protected _title:string;
  protected _description:string;
  protected _content:string;
  protected _main_img?:string;
  protected _admin_id:number;
  protected _admin: any;

  static ins: Blog;
  static table: string = "blogs";

  constructor(blog: ModelAndBlog, table:string) {
    super(blog, table);
    this._title = blog.title;
    this._description = blog.description;
    this._content = blog.content;
    this._main_img = <string> blog.main_img;
    this._admin_id = blog.admin_id;

    // Agregar nombre de administrador
    this.admin().then( admin => this._admin = admin.name );
    
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

  public get main_img():string | undefined{
    return this._main_img;
  }

  public get admin_id(): number {
    return this._admin_id;
  }

  public get their_admin(): any {
    return this._admin;
  }
  
  
  // ===========================

  public async admin() {
    const data:any = await db.query(`
      SELECT admins.id, admins.name, admins.email, admins.password, admins.is_su_admin, admins.updated_at, admins.created_at FROM blogs 
      INNER JOIN admins ON blogs.admin_id=admins.id 
      WHERE blogs.id = ?
    `, [this.id]);
    return data[0];
  }

  static async create(data:any) {

    let query:any = await db.queryPost(
      `INSERT INTO ${this.table} data? VALUES params? RETURNING *`,
      [data]
    );

    this.ins = new this(query[0], this.table);

    return this.ins;
  }

  async update(body:any) {

    let query:any =  await db.queryPatch(`UPDATE ${ this.table } SET data? WHERE id = ? RETURNING *`, [body, this._id]);
    return query[0];

  }
}
