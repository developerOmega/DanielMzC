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

  constructor(admin: ModelAndAdmin){
    super(admin);
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

      this.ins = new this(data[0]);
      return this.ins;

    } catch (error) {
      return error
    }
  }

  public async blogs() {

  }

  public async projects() {

  }

  public async sliders() {

  }
}
