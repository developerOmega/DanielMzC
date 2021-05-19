import Project from '../src/Models/Project';
import { db } from '../src/db/db';
import { ProjectData } from '../src/interfaces/Models';

describe("Test the project model", () => {

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
    
    await db.query(`DELETE FROM projects`);
  });
  
  const values:ProjectData = {
    title: `Project`,
    description: `Descripcion de proyecto`,
    main_img: "img.png",
    admin_id: 1  
  }
  
  it("it should show a project by id", async () => {
    const createProject = await Project.create(values);
    const project:any = await Project.byId(createProject.id);
    
    expect(createProject).toStrictEqual(project);
    await project.delete();
  });

  it("it should show a project by id", async () => {
    const createProject = await Project.create(values);
    const project:any = await Project.byId(createProject.id);
    
    expect(createProject).toStrictEqual(project);
    await project.delete();
  });
  
  it("it should update a project", async () => {
    const project:any = await Project.create(values);
    const projectUdated = await project.update({
      title: "Projecto EDITADO"
    });
    
    expect(projectUdated.title).toEqual("Projecto EDITADO");
    await project.delete();
  });

  it("it should delete a project", async () => {
    const project = await Project.create(values);
    await project.delete();

    const findProject = await Project.byId(project.id);
    expect(findProject).toBe(false);
    db.connection.end();
  });

});
