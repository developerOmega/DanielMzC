const request = require('supertest');
import { server } from '../src/app';
import { db } from '../src/db/db';
import { BlogData, ProjectData, SliderData, SectionData } from '../src/interfaces/Models';
import Blog from '../src/Models/Blog';
import Project from '../src/Models/Project';
import Slider from '../src/Models/Slider';
import Section from '../src/Models/Section';

const img = "/home/daniel/Imágenes/edward-norton.jpg";
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


describe("Test projects and sections files", () => {

  beforeAll(async () => {
    const paramsProjects: ProjectData = {
      title: "Titulo Project",
      description: "Descripcion del Project",
      admin_id: 1
    }
    
    const project = await Project.create(paramsProjects);

    const paramsSections: SectionData = {
      content: "Descripcion del Sections",
      project_id: project.id
    }

    await Section.create(paramsSections);

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


  // =======================================================
  // TEST sections  
  // =======================================================

  test("It should upload section img", async () => {
    const section = await Section.first();
  
    const response = await request(server.app)
      .post(`/api/v1/sections/${section.id}/img`)
      .attach('img', img);
  
    expect(response.statusCode).toBe(200);
  });
  
  test("It should update section img", async () => {
    const section = await Section.first();
    
    const response = await request(server.app)
      .put(`/api/v1/sections/${section.id}/img`)
      .attach('img', imgEdit);
  
    expect(response.statusCode).toBe(200);
  });
  
  test("It should delete section img", async () => {
    const section = await Section.first();
    
    const response = await request(server.app)
      .delete(`/api/v1/sections/${section.id}/img`);
  
    expect(response.statusCode).toBe(200);
  });


});
