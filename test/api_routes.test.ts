const request = require("supertest")
import { db } from '../src/db/db';
import { server } from '../src/app';
import { ProjectData } from '../src/interfaces/Models';
import Project from '../src/Models/Project';
import Section from '../src/Models/Section';
import Admin from '../src/Models/Admin';
import bcrypt from 'bcrypt';

afterAll(async () => {
  let admin = await Admin.last();
  await admin.delete();
  await db.connection.end();
});

beforeAll(async () => {
  await Admin.create({
    name: "Taco",
    email: "taco@email.com",
    password: bcrypt.hashSync("qwerty123", 10),
    is_su_admin: true
  })
});

describe("Test section api routes", () => {

  let token:string;

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


  test("It should auth session", async () => {
    const admin = await Admin.last();

    const response = await request(server.app)
      .post('/api/v1/auth')
      .send({
        email: admin.email,
        password: "qwerty123"
      });
    
    token = response.body.token;
    expect(response.statusCode).toEqual(200);
  });

  test("It should response GET method to api section index", async () => {
    const response = await request(server.app)
    .get("/api/v1/sections")
    .set('Authorization', token);
    expect(response.statusCode).toBe(200);
  });

  test("It should create new section in api", async () => {
    const project = await Project.first();
    
    const response = await request(server.app)
      .post('/api/v1/sections')
      .set('Authorization', token)
      .send({
        img: "image.png",
        content: "Este es el contenido de la seccion",
        project_id: project.id
      })

    expect(response.statusCode).toEqual(200);
    
  });

  test("It should response GET method to api section show", async () => {
    const section = await Section.first();
    const response = await request(server.app)
      .get(`/api/v1/sections/${ section.id }`)
      .set('Authorization', token);

    expect(response.statusCode).toBe(200);
  });

  test("It should update section in api", async () => {
    const section = await Section.first();
    
    const response = await request(server.app)
      .put(`/api/v1/sections/${section.id}`)
      .set('Authorization', token)
      .send({ content: "Contenido EDITADO" });

    expect(response.statusCode).toEqual(200);
  });
  
  test("It should delete section in api", async () => {
    const section = await Section.first();
    
    const response = await request(server.app)
      .delete(`/api/v1/sections/${section.id}`)
      .set('Authorization', token);
    
    expect(response.statusCode).toEqual(200);
  })

});