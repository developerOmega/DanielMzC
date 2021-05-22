const request = require("supertest")
import { db } from '../src/db/db';
import { server } from '../src/app';
import { ProjectData } from '../src/interfaces/Models';
import Project from '../src/Models/Project';
import Section from '../src/Models/Section';

afterAll(async () => {
  await db.connection.end();
});

describe("Test section api routes", () => {

  beforeAll(async () => {
    const params: ProjectData = {
      title: "Titulo de proyecto",
      description: "Descripcion del proyecto",
      admin_id: 1
    }

    await Project.create(params);
  });

  afterAll(async () => {
    const project = await Project.first();
    await project.delete();
  })

  test("It should response GET method to api section index", async () => {
    const response = await request(server.app).get("/api/v1/sections");
    expect(response.statusCode).toBe(200);
  });

  test("It should create new section in api", async () => {
    const project = await Project.first();
    
    const response = await request(server.app)
      .post('/api/v1/sections')
      .send({
        img: "image.png",
        content: "Este es el contenido de la seccion",
        project_id: project.id
      })

    expect(response.statusCode).toEqual(200);
    
  });

  test("It should response GET method to api section show", async () => {
    const section = await Section.first();
    const response = await request(server.app).get(`/api/v1/sections/${ section.id }`);
    expect(response.statusCode).toBe(200);
  });

  test("It should update section in api", async () => {
    const section = await Section.first();
    
    const response = await request(server.app)
      .put(`/api/v1/sections/${section.id}`)
      .send({ content: "Contenido EDITADO" });

    expect(response.statusCode).toEqual(200);
  });
  
  test("It should delete section in api", async () => {
    const section = await Section.first();
    
    const response = await request(server.app)
      .delete(`/api/v1/sections/${section.id}`);
    
    expect(response.statusCode).toEqual(200);
  })

});