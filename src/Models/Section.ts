import Model from './Model';
import {db} from '../db/db';
import { SectionData, ModelData } from "../interfaces/Models";

interface ModelAndSection extends ModelData, SectionData {}

export default class Section extends Model {
  protected _img:string;
  protected _content:string;
  protected _project_id:number;

  static ins: Section;
  static table: string = "sections";

  constructor(section: ModelAndSection) {
    super(section);
    this._img = section.img;
    this._content = section.content;
    this._project_id = section.project_id;
  }

  // ======== GETTERS =========

  public get img():string {
    return this._img;
  }

  public get content():string {
    return this._content;
  }

  public get project_id():number {
    return this.project_id;
  }

  // ==========================

  static async projects() {

  }
}
