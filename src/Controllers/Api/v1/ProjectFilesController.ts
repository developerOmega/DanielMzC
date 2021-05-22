import Project from '../../../Models/Project';
import FilesController from '../FilesControllers';

// Configurar datos de controlador para manejar los metodos globales de la clase padre FilesController

export default class ProjectFilesController extends FilesController {

  // prefijo para nombrar el archivo que se subira a dropbox (ej. us-img, us-main-img)
  protected pref:string;

  // propiedad que es igualada a la instancia del modelo
  protected ins = Project

  // Propiedad que almacena el nombre de parametro a editar dentro de la tabla del modelo
  protected prop:string;

  constructor() {
    super();
    this.pref = 'pro-img';
    this.prop = 'main_img';
  }

  protected updateTo(url:string | undefined):Object {
    return {
      main_img: url
    }
  }

}