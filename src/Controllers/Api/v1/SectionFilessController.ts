import Section from '../../../Models/Section';
import FilesController from '../FilesControllers';

// Configurar datos de controlador para manejar los metodos globales de la clase padre FilesController

export default class SectionFilesController extends FilesController {
  
  // prefijo para nombrar el archivo que se subira a dropbox (ej. us-img, us-main-img)
  protected pref:string;

  // propiedad que es igualada a la instancia del modelo
  protected ins = Section

  constructor() {
    super();
    this.pref = 'sec-img';
  }

}
