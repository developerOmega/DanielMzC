const request = require("supertest")
import { server } from '../src/app';

describe("Test the root path", () => {
  test("It should response the GET method", async () => {
    const response = await request(server.app).get("/");
    expect(response.statusCode).toBe(200);
  });
});
