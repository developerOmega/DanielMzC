const request = require("supertest")
import { server } from '../src/app';

describe("Test the root path", () => {
  test("It should response the GET method to index", async () => {
    const response = await request(server.app).get("/");
    expect(response.statusCode).toBe(200);
  });

  test("It should response the GET method to contact index", async () => {
    const response = await request(server.app).get('/contact');
    expect(response.statusCode).toBe(200);
  });

  test("It should response the GET method to me index", async () => {
    const response = await request(server.app).get('/me');
    expect(response.statusCode).toBe(200);
  })

  test("It should response the GET method to blog index", async () => {
    const response = await request(server.app).get('/blog');
    expect(response.statusCode).toBe(200);
  })
  
  test("It should response the GET method to blog show", async () => {
    const response = await request(server.app).get('/blog/:id');
    expect(response.statusCode).toBe(200);
  });

  test("It should response the GET method to project index", async () => {
    const response = await request(server.app).get('/projects');
    expect(response.statusCode).toBe(200);
  })

  test("It should response the GET method to project show", async () => {
    const response = await request(server.app).get('/projects/:id');
    expect(response.statusCode).toBe(200);
  })

});
