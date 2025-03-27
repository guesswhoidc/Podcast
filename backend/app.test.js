const request = require('supertest');
const App = require('./app');
const Models = require('./models');
const DB = require('./db');
const dotenv = require('dotenv')

describe("App routes for now", () => {
  let app;

  beforeAll(async () => {
    app = App(Models(await DB()));
  });

  test("app is running", async () => {
    const response = await request(app)
      .get('/')
      .expect(200);
    expect(response.text).toBe("Hullo \n");
  });
});

