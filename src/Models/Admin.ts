import Model from './Model';
import { db } from '../db/db';
import { AdminData, ModelData } from '../interfaces/Models';

interface ModelAndAdmin extends ModelData, AdminData {}

export default class Admin extends Model {
  protected _name:string;
  protected _email:string;
  protected _password:string;
  protected _is_su_admin:boolean;

  static ins: Admin;
  static table:string = 'admins'

  constructor(admin: ModelAndAdmin, table:string){
    super(admin, table);
    this._name = admin.name;
    this._email = admin.email;
    this._password = admin.password;
    this._is_su_admin = admin.is_su_admin;

  }

  // ==== GETTERS =======

  public get name():string {
    return this._name;
  }

  public get email():string {
    return this._email;
  }

  public get password():string {
    return this._password;
  }

  public get is_su_admin():boolean {
    return this._is_su_admin;
  }

  // ==================== 

  static async byEmail(email:string) {
    try {
      let data:any = await db.query(`SELECT * FROM ${this.table} WHERE email = ?`, [email]);

      this.ins = new this(data[0], this.table);
      return this.ins;

    } catch (error) {
      return error
    }
  }

  public async blogs() {
    const data:any = await db.query(`
      SELECT blogs.id, blogs.title, blogs.description, blogs.content, blogs.main_img, blogs.admin_id, blogs.updated_at, blogs.created_at  FROM blogs 
      INNER JOIN admins ON blogs.admin_id=admins.id 
      WHERE blogs.admin_id = ?
    `, [this.id]);
    return data;
  }

  public async projects() {
    const data:any = await db.query(`
      SELECT projects.id, projects.title, projects.description, projects.main_img, projects.admin_id, projects.updated_at, projects.created_at FROM projects 
      INNER JOIN admins ON projects.admin_id=admins.id 
      WHERE projects.admin_id = ?
    `, [this.id]);
    return data;
  }

  public async sliders() {
    const data:any = await db.query(`
      SELECT sliders.id, sliders.img, sliders.content, sliders.url, sliders.admin_id, sliders.updated_at, sliders.created_at FROM sliders 
      INNER JOIN admins 
      ON sliders.admin_id=admins.id WHERE sliders.admin_id = ? 
    `, [this.id]);
    return data;
  }

  public async emails() {
    const data:any = await db.query(`
      SELECT emails.id, emails._from, emails._to, emails.subject, emails.html, emails.admin_id, emails.updated_at, emails.created_at FROM emails 
      INNER JOIN admins 
      ON emails.admin_id=admins.id WHERE emails.admin_id = ? 
    `, [this.id]);
    return data;
  }
}
