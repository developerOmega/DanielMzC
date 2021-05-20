const request = require("supertest")
import { db } from '../src/db/db';
import { server } from '../src/app';
import Admin from '../src/Models/Admin';
import Slider from '../src/Models/Slider';
import Blog from '../src/Models/Blog';
import Project from '../src/Models/Project';


afterAll(async () => {
  await db.connection.end();
});

describe("Test admin admins routes", () => {

  test("It should response GET method to admin admins index", async () => {
    const response = await request(server.app).get("/admin/admins");
    expect(response.statusCode).toBe(200);
  });

  test("It should response GET method to admin admins show", async () => {
    const response = await request(server.app).get(`/admin/admins/show/${1}`);
    expect(response.statusCode).toBe(200);
  });

  test("It should response GET method to admin admins new", async () => {
    const response = await request(server.app).get('/admin/admins/new');
    expect(response.statusCode).toBe(200);
  });

  test("It should create new admin", async () => {
    const response = await request(server.app)
      .post('/admin/admins')
      .send({
        name: "Taco",
        email: "taco@email.com",
        password: "qwerty123",
        is_su_admin: false
      })

    expect(response.statusCode).toEqual(201);
    
  });
  
  test("It should update admin", async () => {
    const admin = await Admin.last();
    
    const response = await request(server.app)
      .put(`/admin/admins/${admin.id}`)
      .send({ name: "Taco Perez" });

    expect(response.statusCode).toEqual(201);
  });
  
  test("It should delete admin", async () => {
    const admin = await Admin.last();
    
    const response = await request(server.app)
      .delete(`/admin/admins/${admin.id}`);
    
    expect(response.statusCode).toEqual(201);
  })

});


describe("Test admin sliders routes", () => {
  test("It should response GET methdo to sliders index", async () => {
    const response = await request(server.app).get('/admin/sliders');
    expect(response.statusCode).toBe(200);
  });

  test("It should response GET methdo to sliders new", async () => {
    const response = await request(server.app).get('/admin/sliders/new');
    expect(response.statusCode).toBe(200);
  });

  test("It should create new slider", async () => {

    const response = await request(server.app)
      .post(`/admin/sliders`)
      .send({
        img: "image.png",
        content: "Este es el contenido del slider",
        url: "google.com",
        admin_id: 1
      });

    expect(response.statusCode).toEqual(201);
  });

  test("It should response GET method to sliders show", async () => {
    const slider = await Slider.last();
    const response = await request(server.app).get(`/admin/sliders/show/${slider.id}`);
    expect(response.statusCode).toBe(200);
  });
  
  test("It should response GET method to sliders edit", async() => {
    const slider = await Slider.last();
    const response = await request(server.app).get(`/admin/sliders/edit/${slider.id}`);
    expect(response.statusCode).toBe(200)
  });

  test("It should update slider", async () => {
    const slider = await Slider.last();
    const response = await request(server.app)
      .put(`/admin/sliders/${slider.id}`)
      .send({ url: "https://www.google.com" });

    expect(response.statusCode).toEqual(201);
  });

  test("It should delete slider", async () => {
    const slider = await Slider.last();
    const response = await request(server.app)
      .delete(`/admin/sliders/${slider.id}`);
    
    expect(response.statusCode).toEqual(201);
  });

});


describe("Test admin blogs routes", () => {
  test("It should response GET methdo to blogs index", async () => {
    const response = await request(server.app).get('/admin/blogs');
    expect(response.statusCode).toBe(200);
  });

  test("It should response GET methdo to blogs new", async () => {
    const response = await request(server.app).get('/admin/blogs/new');
    expect(response.statusCode).toBe(200);
  });

  test("It should create new blog", async () => {

    const response = await request(server.app)
      .post(`/admin/blogs`)
      .send({
        title: "Titulo del post",
        description: "Descripcion de post",
        content: "Este es el contenido del post",
        main_img: "image.png",
        admin_id: 1
      });

    expect(response.statusCode).toEqual(201);
  });

  test("It should response GET method to blogs show", async () => {
    const blog = await Blog.last();
    const response = await request(server.app).get(`/admin/blogs/show/${blog.id}`);
    expect(response.statusCode).toBe(200);
  });
  
  test("It should response GET method to blogs edit", async() => {
    const blog = await Blog.last();
    const response = await request(server.app).get(`/admin/blogs/edit/${blog.id}`);
    expect(response.statusCode).toBe(200)
  });

  test("It should update blog", async () => {
    const blog = await Blog.last();
    const response = await request(server.app)
      .put(`/admin/blogs/${blog.id}`)
      .send({ title: "Titulo del blog EDITADO" });

    expect(response.statusCode).toEqual(201);
  });

  test("It should delete blog", async () => {
    const blog = await Blog.last();
    const response = await request(server.app)
      .delete(`/admin/blogs/${blog.id}`);
    
    expect(response.statusCode).toEqual(201);
  });

});


describe("Test admin projects routes", () => {
  test("It should response GET methdo to projects index", async () => {
    const response = await request(server.app).get('/admin/projects');
    expect(response.statusCode).toBe(200);
  });

  test("It should response GET methdo to projects new", async () => {
    const response = await request(server.app).get('/admin/projects/new');
    expect(response.statusCode).toBe(200);
  });

  test("It should create new blog", async () => {

    const response = await request(server.app)
      .post(`/admin/projects`)
      .send({
        title: "Titulo del proyecto",
        description: "Descripcion de proyecto",
        main_img: "image.png",
        admin_id: 1
      });

    expect(response.statusCode).toEqual(201);
  });

  test("It should response GET method to projects show", async () => {
    const project = await Project.last();
    const response = await request(server.app).get(`/admin/projects/show/${project.id}`);
    expect(response.statusCode).toBe(200);
  });
  
  test("It should response GET method to projects edit", async() => {
    const project = await Project.last();
    const response = await request(server.app).get(`/admin/projects/edit/${project.id}`);
    expect(response.statusCode).toBe(200)
  });

  test("It should update project", async () => {
    const project = await Project.last();
    const response = await request(server.app)
      .put(`/admin/projects/${project.id}`)
      .send({ description: "Descripcion de proyecto EDITADO" });

    expect(response.statusCode).toEqual(201);
  });

  test("It should delete project", async () => {
    const project = await Project.last();
    const response = await request(server.app)
      .delete(`/admin/projects/${project.id}`);
    
    expect(response.statusCode).toEqual(201);
  });

})