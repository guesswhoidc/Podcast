const request = require('supertest');
const app = require('./app');

describe("App routes for now", () => {
  test("app is running", async () => {
    const response = await request(app)
      .get('/')
      .expect(200);
    expect(response.text).toBe("Hullo \n");
  });
});

