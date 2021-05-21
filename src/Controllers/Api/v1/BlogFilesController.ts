import Blog from '../../../Models/Blog';
import FilesController from '../FilesControllers';

// Configurar datos de controlador para manejar los metodos globales de la clase padre FilesController

export default class BlogFilesControllers extends FilesController {

  // prefijo para nombrar el archivo que se subira a dropbox (ej. us-img, us-main-img)
  protected pref:string;

  // propiedad que es igualada a la instancia del modelo
  protected ins = Blog

  constructor( ) {
    super();
    this.pref = 'blg-img'; 
  }

}