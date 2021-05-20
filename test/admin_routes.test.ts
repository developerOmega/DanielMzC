const request = require("supertest")
import { db } from '../src/db/db';
import { server } from '../src/app';
import Admin from '../src/Models/Admin';

describe("Test admin routes", () => {

  afterAll(async () => {
    await db.connection.end();
  });

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

})
