import Section  from '../src/Models/Section';
import Project  from '../src/Models/Project';
import { SectionData, ProjectData } from '../src/interfaces/Models';
import {db} from '../src/db/db';

describe("Test the section model", () => {

  beforeAll(async () => {
    const valuesProject:ProjectData = {
      title: `Project`,
      description: `Descripcion de proyecto`,
      main_img: "img.png",
      admin_id: 1  
    }
    
    return await Project.create(valuesProject);

  });
  
 
  it( "it should show all sections", async () => {
    expect(typeof await Section.all()).toBe('object');
  });
  
  it( "it should show two first sections", async () => {

    const project = await Project.first();

    for(let i = 0; i < 2; i++) {
      await Section.create({
        img: `sections-${i}.jpg`,
        content: `Este contenido es la seccion numero ${i}`,
        project_id: project.id
      });
    }
    
    const sections:any = await Section.paginate(1, 2);
    expect(sections.length).toBe(2);
    
    await db.query(`DELETE FROM sections`);
  });

  const values:SectionData = {
    img: "section.jpg",
    content: "Este es un contenido para la seccion",
    project_id: 0
  }

  it("it should show a section by id", async () => {

    const project = await Project.first();
    values.project_id = project.id;

    const createSection = await Section.create(values);
    const section:any = await Section.byId(createSection.id);
    
    expect(createSection).toStrictEqual(section);
    await section.delete();

  });
  
  it("it should update a section", async () => {

    const project = await Project.first();
    values.project_id = project.id;

    const section:any = await Section.create(values);
    const sectionUdated = await section.update({
      img: "sectionEDIT.png"
    });
    
    expect(sectionUdated.img).toEqual("sectionEDIT.png");
    await section.delete();
  });

  it("it should delete a section", async () => {
   
    const project = await Project.first();
    values.project_id = project.id;

    const section = await Section.create(values);
    await section.delete();

    const findSection = await Section.byId(section.id);
    expect(findSection).toBe(false);
    db.connection.end();
  });

});