const request = require("supertest")
import { db } from '../src/db/db';
import { server } from '../src/app';
import Admin from '../src/Models/Admin';
import Slider from '../src/Models/Slider';


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

})