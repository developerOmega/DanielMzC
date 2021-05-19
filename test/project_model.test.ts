import Project from '../src/Models/Project';
import Section from '../src/Models/Section';
import { db } from '../src/db/db';
import { ProjectData } from '../src/interfaces/Models';

describe("Test the project model", () => {

  beforeAll( async () => {
    const values:ProjectData = {
      title: `Project`,
      description: `Descripcion de proyecto`,
      main_img: "img.png",
      admin_id: 1  
    }

    const project:any = await Project.create(values);
    
    return project;
  })

  afterAll(async () => {
    await db.query(`DELETE FROM projects`);
    db.connection.end();
  })

  it( "it should show all projects", async () => {
    expect(typeof await Project.all()).toBe('object');
  });

  it( "it should show two first projects", async () => {
    
    for(let i = 0; i < 2; i++) {
      await Project.create({
        title: `Project No.${i}`,
        description: `Descripcion de proyecto numero ${i}`,
        main_img: "img.png",
        admin_id: 1
      });
    }
    
    const projects:any = await Project.paginate(1, 2);
    expect(projects.length).toBe(2);
    
  });
  
  

  it("it should show the admin of project", async () => {
    const project:any = await Project.first();

    expect( (await project.admin()).id ).toBe(project.admin_id);
  });

  it("it should show the sections of projects", async () => {
    const project:any = await Project.first();
    
    await Section.create({
      img: "image.png",
      content: "Este es el contenido de la seccion",
      project_id: project.id
    });
    
    expect( typeof project.sections() ).toBe('object');
  });
  
  it("it should show a project by id", async () => {
    const findProject = await Project.first();
    const project:any = await Project.byId(findProject.id);
    
    expect(findProject).toStrictEqual(project);
  });
  
  it("it should update a project", async () => {
    const project:any = await Project.first();
    const projectUdated = await project.update({
      title: "proyecto EDITADO"
    });
    
    expect(projectUdated.title).toEqual("proyecto EDITADO");
  });

  it("it should delete a project", async () => {
    const project = await Project.first();
    await project.delete();

    const findProject = await Project.byId(project.id);
    expect(findProject).toBe(false);
  });

});
