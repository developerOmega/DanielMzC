import Model from './Model';
import {db} from '../db/db';
import { SectionData, ModelData } from "../interfaces/Models";

interface ModelAndSection extends ModelData, SectionData {}

export default class Section extends Model {
  protected _img?:string;
  protected _content:string;
  protected _project_id:number;

  static ins: Section;
  static table: string = "sections";

  constructor(section: ModelAndSection, table:string) {
    super(section, table);
    this._img = section.img;
    this._content = section.content;
    this._project_id = section.project_id;
  }

  // ======== GETTERS =========

  public get img():string | undefined {
    return this._img;
  }

  public get content():string {
    return this._content;
  }

  public get project_id():number {
    return this._project_id;
  }

  // ==========================

  static async byProjectId( project_id:number ) {
    const data:any = await db.query(`
      SELECT * FROM sections WHERE project_id = ? ORDER BY created_at ASC;
    `, [project_id]);
    return data;
  }

  public async project() {
    const data:any = await db.query(`
      SELECT projects.id, projects.title, projects.description, projects.main_img, projects.admin_id, projects.updated_at, projects.created_at FROM projects 
      INNER JOIN sections ON projects.id=sections.project_id 
      WHERE sections.id = ?  
    `, [this.id]);
    return data[0];
  }

}
