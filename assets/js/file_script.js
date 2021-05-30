import Open from './open';
import RequestFile from './requests/requestFile';
import Loading from './components/Loading';

export default class FileOpen extends Open {

  formFile;
  buttonsCont;
  imgTag;
  imgPath;
  file;

  label;

  table; 
  column;

  loadingComponent;

  constructor( table, column, pathname ) {
    super(pathname);

    // nombe de tabla y colunma (nombre del parametro de la imagen), para crear rutas instancias dinamicas con blogs, sectios, projects y sliders
    this.table = table;
    this.column = column;

    this.label = document.querySelector('#label-img');

    this.formFile = document.querySelector("#img");
    this.buttonsCont = document.querySelector("#buttons");
    this.imgTag = document.querySelector('#img-tag');
    this.imgPath = "";
    this.file = new RequestFile();

    this.loadingComponent = new Loading( this.label );
  }

  main() {

    // Eventos para seleccionar imagen
    this.formFile.addEventListener('change', (e) => {
      const img = this.getImgPath(e.target.files[0])
      this.createButton()
      this.changeButton()
      this.remplaceImg(img)
    });

    // Evento para eliminar imagen
    this.buttonsCont.children[0].addEventListener('click', () => { this.deleteFile() })

  }

  // Convertir imagen en url para poder mostrar en pantalla
  getImgPath(path) { return URL.createObjectURL(path) }

  // Remplazar imagen base por imagen seleccionada
  remplaceImg(img) {
    this.imgPath = this.imgTag.src;
    this.imgTag.setAttribute('src', img);

    // Eliminar accion de label
    this.imgTag.parentNode.setAttribute("for", "");
  }

  // Agregar boton para guardar imagen
  createButton() {
    let button = `<button id="upload-file" type="button" class="btn" > Guardar </button>`;
    this.buttonsCont.innerHTML = button + this.buttonsCont.innerHTML;

    // Agregar evento para para actualizar imagen en el boton "Guardar"
    this.buttonsCont.children[0].addEventListener('click', async (e) => {
      const form = this.buttonsCont.parentNode;
      await this.uploadFile( eval('form.' + this.column + '.files[0]') );
    });
  }

  // Cambiar accion de boton de eliminar por cancelar
  changeButton() {
    const buttonDrop =  document.querySelector("#drop-file");
    buttonDrop.id = "cancel-file";
    buttonDrop.innerHTML = "Cancelar";

    // Agregra evento para cancelar imagen seleccionada
    buttonDrop.addEventListener('click', e => { 
      this.cancelFile(); 
      this.cancelButton();
    });
  }

  // Eliminar boton "Guardar" y agregar boton "Eliminar"
  cancelButton() {
    let button = `<button id="drop-file" type="button" class="btn b-red"> Eliminar </button>`;
    this.buttonsCont.innerHTML = button;

    // Agregra evento para eliminar imagen
    this.buttonsCont.children[0].addEventListener('click', () => { this.deleteFile() })
  }

  // Remover imagen seleccionada y retornar la accion de label
  cancelFile() {
    this.imgTag.setAttribute('src', this.imgPath);
    this.label.setAttribute("for", "img");
  }

  // Subir archivo con la peticion del API
  async uploadFile(file) {

    // activar loading tag
    this.loadingComponent.set();

    try {
      
      const req = `/api/v1/${this.table}/${ this.file.id }/img`;
      
      // Crear data
      const data = new FormData();
      data.append(this.column, file);
      
      // Si la propiedad imgPath es igual a la imagen default, entonces crear nueva imagen; en caso contrario actualizar la imagen existenete
      const result = this.imgPath == `${this.file.url}/images/main_image.png` ? 
        await this.file.setReq( req, data ) :
        await this.file.updateReq(req, data);
  
      // imgPath es igual a la nueva imagen
      this.imgPath = eval('result.data.' + this.column);

      this.cancelFile();
      this.cancelButton();

      // activar loading tag
      this.dropLoading();

    } catch (error) {
      console.error(error)  
    }
  }

  // Eliminar imagen
  async deleteFile() {

    // activar loading tag
    this.loadingComponent.set()

    const req = this.imgPath = `/api/v1/${this.table}/${ this.file.id }/img`;
    
    // Llamar metodo para eliminar imagen
    await this.file.deleteReq(req);

    // activar loading tag
    this.dropLoading();
    
    // imgPath es igual a imagen default
    this.imgPath = `${this.file.url}/images/main_image.png`;
    this.cancelFile();

  }

  // desactivar loader tag
  dropLoading() {
    // Eiminar loader
    this.loadingComponent.drop();

    // referencia de imagen
    this.imgTag = document.querySelector("#img-tag");
  }

} 