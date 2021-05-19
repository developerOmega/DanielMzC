import Model from "./Model";
import { ModelData, ProjectData } from "../interfaces/Models";
import {db} from '../db/db';

interface ModelAndProject extends ModelData, ProjectData {}

export default class Project extends Model {
  protected _title:string;
  protected _description:string;
  protected _main_img: string;
  protected _admin_id:number;

  static ins: Project;
  static table:string = "projects";

  constructor(project: ModelAndProject, table:string) {
    super(project, table);
    this._title = project.title;
    this._description = project.description;
    this._main_img = project.main_img;
    this._admin_id = project.admin_id;
  }

  // ======== GETTERS =========

  public get title():string {
    return this._title;
  }

  public get description():string {
    return this._description;
  }

  public get main_img():string {
    return this._main_img;
  }

  public get admin_id():number {
    return this._admin_id;
  }

  // ==========================

  public async admin() {
    const data:any = await db.query(`
      SELECT admins.id, admins.name, admins.email, admins.password, admins.is_su_admin, admins.updated_at, admins.created_at FROM projects 
      INNER JOIN admins ON projects.admin_id=admins.id 
      WHERE projects.id = ? 
    `, [this.id]);
    return data[0];
  }

  public async sections() { 
    const data:any = await db.query(`
      SELECT sections.id, sections.img, sections.content, sections.project_id, sections.updated_at, sections.created_at FROM sections 
      INNER JOIN projects ON sections.project_id=projects.id 
      WHERE sections.project_id = ?
    `, [this.id]);
    return data;
  }
}
