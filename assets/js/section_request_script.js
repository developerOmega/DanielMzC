import SectionScript from './section_script';
import Request from './requests/request';
import RequestFile from './requests/requestFile';

export default class SectionRequestScript extends SectionScript {

  section;
  sectionFile;
  form;
  listCont;
  pathImg;

  constructor(pathname) {
    super(pathname);

    this.section = new Request();
    this.sectionFile = new RequestFile();

    this.form = document.querySelector('#form-sections');
    this.listCont = document.querySelector('#list-cont');
  }

  main() {
    this.listCont.innerHTML = "";
    this.getSections();
    
    // Mostrar pantalla screen
    this.btnNewSection.addEventListener('click', e => {
      this.applyClassScreen('screen');
      this.addEventNewSection();
      this.clearValues();
    });
  }
  
  // Agregar sections
  addEventNewSection() {
    this.form.addEventListener('submit', async (e) => { 
      e.preventDefault();
      await this.setSection(e.target.content.value, e.target.img.files[0]);
    });
  }

  // Limpiar valores de formulario
  clearValues() {
    this.form.content.value = "";
    this.form.img.value = "";
    this.imgTag.src = "/images/main_image.png";

    this.form.addEventListener('submit', this.addEventNewSection )
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

    this.listCont.appendChild(divItem);
  }

  openFormEdit(id, content, img) {
    this.form.content.value = content;
    this.imgTag.src = img;
    this.applyClassScreen('screen');
    
    this.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      await this.updateSection(id, e.target.content, e.target.img.files[0]);
    });
  }

  async getSections(){
    try {
      const data = await this.section.getReq('/api/v1/sections');
      console.log(data)
      
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
      const result = await this.section.setReq( query, data);

      // Si la data de la imagen existe, subir imagen
      if(img) {
        await this.setFile(img, data.section._id);
      }

      // Limpiar inputs y ocultar screen tag
      this.clearValues();
      this.applyClassScreen('none');

    } catch (error) {
      console.error(error);
    }
  }

  // Actualizar imagen de seccion
  async updateSection(id, content, img) {
    try {
      // Actualizar registro de sections
      const data = await this.section.updateReq( `/api/v1/sections/${id}`, { 
        content,
        project_id: this.section.id
      });

      // Si la data de la imagen existe, subir imagen
      if(img) {
        await this.setFile(img, data.section._id);
      }

      // Limpiar inputs y ocultar screen tag
      this.clearValues();
      this.applyClassScreen('none');
    } catch (error) {
      console.erro(error)
    }
  }

  // Agregar imagen de seccion
  async setFile(file, section_id) {
    try {
      const query = `/api/v1/sections/${section_id}/img`;

      // Crear data
      const data = new FormData();
      data.append('img', file);
      
      console.log(this.imgTag.src)
      // Hacer peticion para subir archivo
      const result = this.imgTag.src == '/images/main_image.png' ?
        await this.sectionFile.setReq(query, data) :
        await this.sectionFile.updateReq( query, data);

    } catch (error) {
      console.error(error);
    }
  }
  

}