import Open from './open';
import Loading from './components/Loading';

export default class SectionScript extends Open {
  
  screen;
  btnNewSection;
  btnCancelSection;
  btnAddSection;
  imgTag;
  input;
  imgPath;

  loadingComponent;


  constructor(pathname) {
    super(pathname);

    this.screen = document.querySelector('#screen');
    this.btnNewSection = document.querySelector('#btn-new-section');

    this.btnCancelSection = document.querySelector('#btn-cancel-section');
    this.btnAddSection = document.querySelector('#btn-add-section');
    
    this.imgTag = document.querySelector('#img-section-tag');
    this.imgPath = ""

    this.input = document.querySelector('#img-section');
    this.form = document.querySelector('#form-sections');

    this.loadingComponent = new Loading( document.querySelector('#label-section-img') );
  }
  
  main() {

    // Eliminar pantalla screen con 'Escape'
    document.addEventListener('keydown', e => {
      if(e.keyCode == 27){
        this.applyClassScreen('none');
      }
    });

    // Eliminar pantalla screen
    this.btnCancelSection.addEventListener('click', e => {
      this.applyClassScreen('none');
    });

    // Mostrar imagenes seleccionadas en label
    this.input.onchange = (e) => this.eventChangeImg(e);
    
  }
  
  // Evento para mostrar imagen seleccionada en pantalla
  eventChangeImg(e) {
    const img = this.getImgPath(e.target.files[0]);
    this.imgTag.src = img;
  }

  // Convertir imagen en url para poder mostrar en pantalla
  getImgPath(path) { return URL.createObjectURL(path) }

  // Agregar clase a propiedad screen
  applyClassScreen(className) { this.screen.className = className }

  // Remplazar imagen base por imagen seleccionada
  remplaceImg(img) { 
    this.imgTag.src = img;
    this.imgPath = img; 
  }

  // desactivar loader tag
  dropLoading() {
    // Eiminar loader
    this.loadingComponent.drop();

    // referencia de imagen
    this.imgTag = document.querySelector('#img-section-tag');

    // Referencia de input
    this.input = document.querySelector('#img-section');
    this.input.onchange = (e) => this.eventChangeImg(e);
  }


}