import Open from './open';
import RequestFile from './requests/requestFile';

export default class FileOpen extends Open {

  formFile;
  buttonsCont;
  imgTag;
  imgPath;
  file;

  label;

  table; 
  column;

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
    this.setLoading();

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
    this.setLoading();

    const req = this.imgPath = `/api/v1/${this.table}/${ this.file.id }/img`;
    
    // Llamar metodo para eliminar imagen
    await this.file.deleteReq(req);

    // activar loading tag
    this.dropLoading();
    
    // imgPath es igual a imagen default
    this.imgPath = `${this.file.url}/images/main_image.png`;
    this.cancelFile();

  }

  // Activar loader tag
  setLoading() {
    const label = this.imgTag.parentNode;
    const svg = `
      <div class="loader" title="0">
        <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
          <path opacity="0.2" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
          s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
          c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z" />
          <path fill="00CBF0" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
          C22.32,8.481,24.301,9.057,26.013,10.047z">
            <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="0.5s" repeatCount="indefinite" />
          </path>
        </svg>
      </div>
    `;

    label.innerHTML = svg + label.innerHTML;

  }

  // desactivar loader tag
  dropLoading() {
    // Eiminar loader
    this.label.removeChild(this.label.children[0]);

    // referencia de imagen
    this.imgTag = document.querySelector("#img-tag");
  }

} 