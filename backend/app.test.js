const request = require('supertest');
const app = require('./app');

describe("App routes for now", () => {
  test("app is running", () => {
    request(app)
      .get('/')
      .expect(200)
      .then(response => {
        expect(response.body).toBe("Hullo \n")
      });
  });
});

