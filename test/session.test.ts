const request = require('supertest');
import {server} from '../src/app';
import Admin from '../src/Models/Admin';

describe("Test session", () => {

  test("It should response the GET method the session index", async () => {
    const response = await request(server.app).get('/admin_panel/login');
    expect(response.statusCode).toBe(200);
  });

  test("It should create Admin", async () => {
    const response = await request(server.app)
      .post('/admin_panel/admins')
      .send({
        name: "Taco",
        email: "taco@email.com",
        password: "qwerty123",
        is_su_admin: true
      });

    expect(response.statusCode).toEqual(201);
  })

  test("It should Login session", async () => {
    const admin = await Admin.last();

    const response = await request(server.app)
      .post('/admin_panel/login')
      .send({
        email: admin.email,
        password: "qwerty123"
      });
      
    expect(response.statusCode).toEqual(201);
  });

  test("It should Logout session", async () => {
    const response = await request(server.app)
      .delete('/admin_panel/logout');
      
    expect(response.statusCode).toEqual(201);
  });

  test("It should delete Admin", async () => {
    const admin = await Admin.last();
    const response = await request(server.app)
      .delete(`/admin_panel/admins/${admin.id}`);

    expect(response.statusCode).toEqual(201);
  })
});
