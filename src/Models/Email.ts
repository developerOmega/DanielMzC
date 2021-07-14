import Model from './Model';
import { EmailData, ModelData } from '../interfaces/Models';
import { db } from '../db/db';

interface ModelAndEmail extends ModelData, EmailData {};

export default class Email extends Model {
  protected __from: string;
  protected __to: string;
  protected _subject: string;
  protected _html: string;
  protected _admin_id: number;

  static ins: Email;
  static table: string = "emails";

  constructor( email: ModelAndEmail, table: string ) {
    super(email, table);

    this.__from = email._from;
    this.__to = email._to;
    this._subject = email.subject;
    this._html = email.html;
    this._admin_id = email.admin_id
  }

  // ======== GETTERS =========

  public get _from():string {
    return this.__from;
  }

  public get _to(): string {
    return this.__to;
  }

  public get subject(): string {
    return this._subject;
  }

  public get html(): string {
    return this._html;
  }

  public get admin_id(): number {
    return this._admin_id;
  }

  // ==========================

  public async admin() {
    const data:any = await db.query(`
      SELECT admins.id, admins.name, admins.email, admins.password, admins.is_su_admin, admins.updated_at, admins.created_at FROM emails 
      INNER JOIN admins ON emails.admin_id=admins.id 
      WHERE admins.id = ? 
    `, [this.id]);
    return data[0];
  }
}

