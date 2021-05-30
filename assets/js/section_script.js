import Open from './open';
import Request from './requests/request';
import RequestFile from './requests/requestFile';

export default class SectionScript extends Open {
  
  screen;
  btnNewSection;
  btnCancelSection;
  btnAddSection;
  imgTag;
  input;
  imgPath;

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
  }
  
  main() {
    console.log("Agregar secciones");

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
    this.input.addEventListener('change', e => {
      const img = this.getImgPath(e.target.files[0]);
      this.remplaceImg(img);
    });

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

}