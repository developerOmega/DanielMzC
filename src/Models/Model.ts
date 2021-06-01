import { db } from '../db/db';
import { ModelData } from '../interfaces/Models';

export default class Model {

  // Propiedades de la tabla
  protected _id: number;
  protected _updated_at: string;
  protected _created_at: string;

  // Instancia del Modelo
  static ins: Model;

  // Nombre de la tabla de la db
  static table:string = 'models';

  // Nombre de tabla para metodos de instnacia (Se podria mejorar)
  protected table:string;

  constructor(model: ModelData, table:string) {
    this._id = model.id;
    this._updated_at = model.updated_at;
    this._created_at = model.created_at;
    this.table = table;
  }

  // GETTERS
  public get id():number {
    return this._id;
  }

  public get updated_at():string {
    return this._updated_at;
  }

  public get created_at():string {
    return this._created_at;
  }

  // Metodo que elimina los caractares de HTML
  // Recibe parametros -> data:string (valor del string)
  protected static strip(data:string):string {
    return data.replace(/(<([^>]+)>)/gi, "");
  }

  // Metodo que elimina los caractes HTML de un objecto
  // Recine parametros -> data:object (datos de objecto)
  protected static striptData(data:any) {
    for(let comp in data) {
      if(typeof data[comp] == 'string')
        data[comp] = this.strip(data[comp]);
    }

    return data;
  }

  // Metodo para convertir los links publicos de dropbox en links de imagens
  //  Recibe parametros -> url:string (link publico de archovo subido por el api de dbx)
  static imageUrl(url:string) {
  
    if(url.match(/www.dropbox.com/)){
      let regex = /www.dropbox.com/;
      let imageUrl = url.replace(regex, 'dl.dropboxusercontent.com');
      imageUrl = imageUrl.replace( /[?]dl=0/, '' );
      return imageUrl;
    }
  
  }

  // Metodo que busca el nombre de un archivo / imagen,
  // Recibe parametro -> link:string (Lonk donde se encuentra guardo el archivo)
  static getImg(link:string):string {
    let cutImg:string[] = link.split('/');    
    let fileName:string = cutImg[cutImg.length -1];
    return `/${fileName}`;
  }

  static async all(){
    const data = await db.query(`SELECT * FROM ${ this.table }`);
    return data;
  }

  static async paginate (init:number = 0, limit:number = 0, order:string = "ASC") {

    let data = init != 0 && limit != 0 ? order == "ASC" ?
      await db.query(`SELECT * FROM ${ this.table } ORDER BY id ASC OFFSET ? LIMIT ?`, [init - 1, limit]) :
      await db.query(`SELECT * FROM ${ this.table } ORDER BY id DESC OFFSET ? LIMIT ?`, [init - 1, limit]) :
      await db.query(`SELECT * FROM ${this.table}`);
    return data;
  }

  static async byId(id:number) {
    try {
      let data:any = await db.query(`SELECT * FROM ${ this.table } WHERE id=?`, [id]);
      if(!data[0]){
        return false;
      }

      this.ins = new this(data[0], this.table);
      return this.ins;

    } catch (err) {
      return err;
    }
  }

  static async first() {
    try {
      let data:any = await db.query(`SELECT * FROM ${this.table} LIMIT 1`);
      
      if(!data[0]){
        return false;
      }

      this.ins = new this(data[0], this.table);
      return this.ins;

    } catch (err) {
      return err;
    }
  }

  static async last() {
    try {
      let data:any = await db.query(`SELECT * FROM ${this.table} ORDER BY id DESC LIMIT 1`);
      if(!data[0]){
        return false;
      }

      this.ins = new this(data[0], this.table);
      return this.ins;

    } catch (err) {
      return err;
    }
  }

  static async create(data:any) {

    data = this.striptData(data);

    let query:any = await db.queryPost(
      `INSERT INTO ${this.table} data? VALUES params? RETURNING *`,
      [data]
    );

    this.ins = new this(query[0], this.table);

    return this.ins;
  }

  async update(body:any) {

    body = Model.striptData(body);

    let query:any =  await db.queryPatch(`UPDATE ${ this.table } SET data? WHERE id = ? RETURNING *`, [body, this._id]);
    return query[0];
  }

  async delete() {
    let data = await db.query( `DELETE FROM ${ this.table } WHERE id = ?`, [this._id]);
    return data;
  }

}