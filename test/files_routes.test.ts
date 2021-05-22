const request = require('supertest');
import { server } from '../src/app';
import { db } from '../src/db/db';
import { BlogData, ProjectData, SliderData } from '../src/interfaces/Models';
import Blog from '../src/Models/Blog';
import Project from '../src/Models/Project';
import Slider from '../src/Models/Slider';

const img = "/home/daniel/Imágenes/perfil.jpg";
const imgEdit = "/home/daniel/Imágenes/payaso.jpg";

jest.setTimeout(15000);

afterAll(async () => {
  await db.connection.end();
});

describe("Test blog files", () => {

  beforeAll(async () => {
    const params: BlogData = {
      title: "Titulo Blog",
      description: "Descripcion de Blog",
      content: "Contenido de Blog",
      admin_id: 1
    }

    return await Blog.create(params);
  });

  afterAll(async () => {
    const blog = await Blog.first(); 
    await blog.delete();
  })

  test("It should upload blog main_img", async () => {
    const blog = await Blog.first();

    const response = await request(server.app)
      .post(`/api/v1/blogs/${blog.id}/img`)
      .attach('main_img', img);

    expect(response.statusCode).toBe(200);
  });

  test("It should update blog main_img", async () => {
    const blog = await Blog.first();
    
    const response = await request(server.app)
      .put(`/api/v1/blogs/${blog.id}/img`)
      .attach('main_img', imgEdit);

    expect(response.statusCode).toBe(200);
  });

  test("It should delete blog main_img", async () => {
    const blog = await Blog.first();
    
    const response = await request(server.app)
      .delete(`/api/v1/blogs/${blog.id}/img`);

    expect(response.statusCode).toBe(200);
  });

});


describe("Test projects files", () => {

  beforeAll(async () => {
    const params: ProjectData = {
      title: "Titulo Project",
      description: "Descripcion del Project",
      admin_id: 1
    }

    return await Project.create(params);
  });

  afterAll(async () => {
    const project = await Project.first(); 
    await project.delete();
  })

  test("It should upload project main_img", async () => {
    const project = await Project.first();

    const response = await request(server.app)
      .post(`/api/v1/projects/${project.id}/img`)
      .attach('main_img', img);

    expect(response.statusCode).toBe(200);
  });

  test("It should update project main_img", async () => {
    const project = await Project.first();
    
    const response = await request(server.app)
      .put(`/api/v1/projects/${project.id}/img`)
      .attach('main_img', imgEdit);

    expect(response.statusCode).toBe(200);
  });

  test("It should delete project main_img", async () => {
    const project = await Project.first();
    
    const response = await request(server.app)
      .delete(`/api/v1/projects/${project.id}/img`);

    expect(response.statusCode).toBe(200);
  });

});

describe("Test sliders files", () => {

  beforeAll(async () => {
    const params: SliderData = {
      content: "Descripcion del Slider",
      admin_id: 1
    }

    return await Slider.create(params);
  });

  afterAll(async () => {
    const slider = await Slider.first(); 
    await slider.delete();
  })

  test("It should upload slider img", async () => {
    const slider = await Slider.first();

    const response = await request(server.app)
      .post(`/api/v1/sliders/${slider.id}/img`)
      .attach('img', img);

    expect(response.statusCode).toBe(200);
  });

  test("It should update slider img", async () => {
    const slider = await Slider.first();
    
    const response = await request(server.app)
      .put(`/api/v1/sliders/${slider.id}/img`)
      .attach('img', imgEdit);

    expect(response.statusCode).toBe(200);
  });

  test("It should delete slider img", async () => {
    const slider = await Slider.first();
    
    const response = await request(server.app)
      .delete(`/api/v1/sliders/${slider.id}/img`);

    expect(response.statusCode).toBe(200);
  });

});