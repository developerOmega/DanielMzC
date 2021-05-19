import Model from "./Model";
import { ModelData, ProjectData } from "../interfaces/Models";
import {db} from '../db/db';

interface ModelAndProject extends ModelData, ProjectData {}

export default class Project extends Model {
  protected _title:string;
  protected _description:string;
  protected _main_img: string;
  protected _admin_id:number;

  static int: Project;
  static table:string = "projects";

  constructor(project: ModelAndProject) {
    super(project);
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

  static async admin() {

  }

  static async sections() {

  }
}
