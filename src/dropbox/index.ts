import fetch = require('isomorphic-fetch');
const Dropbox = require('dropbox').Dropbox;
import { dropboxEnv } from '../config/config';
const fs = require('fs');

// Clase que ejecuta api de Dropbox
export default class DropboxApi {
    static instance:DropboxApi;
    protected dbx: any;

    constructor(){
      // Instancia de dropbox
      // pasar clave de token y libreria fetch como parametros  
      this.dbx = new Dropbox({accessToken: dropboxEnv, fetch});
    }

    // Inicializar calse
    static on(){
      this.instance = this.instance || new this();
      return this.instance;
    }

    // Lista de los archivos almacenados de la aplicacion dropbox
    // Recibe parametros -> path:string, callback:function
    async listFolder(path:string){
      try {
        const fileListFolder = await this.dbx.filesListFolder({path});
        return fileListFolder;
        
      } catch (error) {
        return error;

      }
    }

    // Subir archivos a aplicacion dropbox
    // Recibe parametros -> path:string (nombre de la imagen), contents:img (data de la imagen), callback:function
    async upload(path:string, contents:any ){
      try {
        const data = await this.dbx.filesUpload({path, contents});
        return data;
        
      } catch (error) {
        return error;

      }

    }

    // Crear link publico de archivo de la aplicacion dropbox
    // Recibe parametros -> path:string (path_display de la imagen subida), callback:function
    async sharedLink(path:string){
      try {
        const data = await this.dbx.sharingCreateSharedLinkWithSettings({path})
        return data;

      } catch (error) {
        return error;

      }
    }

    // Eliminar archivos de aplicacion dropbox
    // Recibe parametros -> path:string (nombre de la imagen que se encuentra almacenada), callback:function
    async delete(path:string){

      try {
        const data = await this.dbx.filesDelete({path})
        return data;

      } catch (error) {
        return error;

      }

    }

    // Actualizar archivos de una aplicacion dropbox
    // Recibe parametros -> 
    //      path:string (nombre de la imagen que sera remplazada), 
    //      newPath:string(nombre de la nueva imagen), 
    //      contents:img(data de la imagen)    
    async update(path:string, newPath:string, contents:any) {
      try {
        await this.dbx.filesDelete({path});        

        const img = await this.upload(newPath, contents);
        const dataPath = img.result.path_display;

        const data = await this.sharedLink(dataPath);
        return data;

      } catch (error) {
        return error;
      }
    }

}
