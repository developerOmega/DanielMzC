import Slider from '../../../Models/Slider';
import FilesController from '../FilesControllers';

// Configurar datos de controlador para manejar los metodos globales de la clase padre FilesController

export default class SliderFilesController extends FilesController {
  // prefijo para nombrar el archivo que se subira a dropbox (ej. us-img, us-main-img)
  protected pref:string;
  
  // propiedad que es igualada a la instancia del modelo
  protected ins = Slider

  constructor( ) {
    super();
    this.pref = 'sld-img'; 
  }
  
}