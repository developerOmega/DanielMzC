const request = require('supertest');
import {server} from '../src/app';
import Admin from '../src/Models/Admin';
import bcrypt from 'bcrypt';
import { db } from '../src/db/db';

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

describe("Test session", () => {

  test("It should response the GET method the session index", async () => {
    const response = await request(server.app).get('/admin_panel/login');
    expect(response.statusCode).toBe(200);
  });

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

});

describe("Test auth jwt", () => {
  test("It should auth session", async () => {
    const admin = await Admin.last();

    const response = await request(server.app)
      .post('/api/v1/auth')
      .send({
        email: admin.email,
        password: "qwerty123"
      });

    expect(response.statusCode).toEqual(200);
  });
})
