import SectionScript from './section_script';
import Request from './requests/request';
import RequestFile from './requests/requestFile';
import Loading from './components/Loading';

export default class SectionRequestScript extends SectionScript {

  section;
  sectionFile;
  form;
  listCont;

  constructor(pathname) {
    super(pathname);

    this.section = new Request();
    this.sectionFile = new RequestFile();

    this.form = document.querySelector('#form-sections');
    this.listCont = document.querySelector('#list-cont');
  }

  main() {
    this.getSections();
    
    // Mostrar pantalla screen
    this.btnNewSection.addEventListener('click', e => {
      this.applyClassScreen('screen');
      this.cleanForm();
    });
  }

  // callback para agregar sections en evento
  async eventNewSection(e) {
    e.preventDefault();
    await this.setSection(e.target.content.value, e.target.img.files[0]);
  }
  
  // callback para actualizar sections en evento
  async eventUpdateSection(e, id) {
    e.preventDefault();
    await this.updateSection(id, e.target.content.value, e.target.img.files[0]);
  }


  // Abrir formulario para editar secciones
  openFormEdit(id, content, img) {  

    this.form.content.value = content;
    this.remplaceImg(img);

    this.applyClassScreen('screen');

    // Agregra evento sobmit para crear registro
    this.form.onsubmit = async (e) => await this.eventUpdateSection(e, id);
  }

  // Limpiar valores de formulario
  cleanForm() {

    console.log("Limpiando data")

    this.form.content.value = "";
    this.form.img.value = "";
    this.remplaceImg("/images/main_image.png");

    // Agregra evento sobmit para crear registro
    this.form.onsubmit = async (e) => await this.eventNewSection(e);
  }

  // Crear item tag
  createItem( data ) {

    const divItem = document.createElement('div')
    const divContent = document.createElement('div')
    const divButtons = document.createElement('div');
    const img = document.createElement("img");
    const buttonEdit = document.createElement("button");
    const buttonDelete = document.createElement("button");

    divItem.className = "item";
    divButtons.className = "buttons-cont";
    buttonDelete.className = "btn b-red";
    buttonEdit.className = "btn"
    
    img.src = data.img;

    divContent.innerHTML = data.content;
    buttonEdit.innerHTML = "Editar"
    buttonDelete.innerHTML = "Eliminar"

    divItem.appendChild(img);
    divItem.appendChild(divContent);

    divItem.appendChild(divButtons);
    
    divButtons.appendChild(buttonEdit);
    divButtons.appendChild(buttonDelete);

    buttonEdit.addEventListener('click', e => { this.openFormEdit( data.id, data.content, data.img ) })
    buttonDelete.addEventListener('click', e => { this.deleteSection( data.id ) })

    this.listCont.appendChild(divItem);
  }

  // Mostrar lista de secciones
  async getSections(){
    try {
      // Limpiar contenido html del list cont tag
      this.listCont.innerHTML = "";

      // Lista de las secciones pertenecientes al proyecto
      const data = await this.section.getReq(`/api/v1/projects/${this.section.id}/sections`);
      
      // Crear items tags
      data.sections.forEach( (section) => { this.createItem( section ) } )

    } catch (error) {
      console.error(error)
    }
  }

  // Agregar seccion  
  async setSection(content, img) {
    try {
      const query = '/api/v1/sections';
      const data = {
        content,
        project_id: this.section.id
      } 
      
      // Crear registro de sections
      let result = await this.section.setReq( query, data);

      // Si la data de la imagen existe, subir imagen
      if(img) {
        result = await this.setFile(img, result.section._id);
      }
      

      // Limpiar inputs y ocultar screen tag
      this.cleanForm();
      this.applyClassScreen('none');

      // Agregra item a list tag
      this.createItem( result.data );

    } catch (error) {
      console.error(error);
    }
  }

  // Actualizar seccion
  async updateSection(id, content, img) {
    try {

      // Actualizar registro de sections
      const data = await this.section.updateReq( `/api/v1/sections/${id}`, { 
        content,
        project_id: this.section.id
      });

      // Si la data de la imagen existe, subir imagen
      if(img) {
        await this.setFile(img, data.section.id);
      }

      // Limpiar inputs y ocultar screen tag
      this.cleanForm();
      this.applyClassScreen('none');


      // Actualizar lista de sections
      this.getSections();

    } catch (error) {
      console.erro(error)
    }
  }

  // Eliminar seccion
  async deleteSection(id) {
    try {

      const section = await this.section.getReq(`/api/v1/sections/${id}`);

      if (section.section.img != "/images/main_image.png") {
        this.deleteFile(id);
      }

      // Eliminar registro de seccion
      const data = await this.section.deleteReq(`/api/v1/sections/${id}`);

      // Actualizar lista de sections
      this.getSections();

    } catch (error) {
      console.error(error);
    }
  }

  // Agregar imagen de seccion
  async setFile(file, section_id) {
    try {

      // Agregar loader tag
      this.loadingComponent.set();
      
      const query = `/api/v1/sections/${section_id}/img`;

      // Crear data
      const data = new FormData();
      data.append('img', file);
      
      // Hacer peticion para subir archivo
      const result = this.imgPath == '/images/main_image.png' || this.imgPath == `${this.sectionFile.url}/images/main_image.png` ?
        await this.sectionFile.setReq(query, data) :
        await this.sectionFile.updateReq( query, data);

      // Eliminar loader tag
      this.dropLoading();
      
      return result;

    } catch (error) {
      console.error(error);
    }
  }

  // Eliminar imagen de seccion
  async deleteFile(section_id) {
    try {

      // Agregar loader tag
      this.loadingComponent.set();

      const query = `/api/v1/sections/${section_id}/img`;
      
      // Hacer peticion para subir archivo
      const result = await this.sectionFile.deleteReq(query);

      // Eliminar loader tag
      this.dropLoading();

    } catch (error) {
      console.error(error);
    }
  }

}