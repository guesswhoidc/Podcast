const request = require('supertest');
const app = require('../app');

describe('Podcasts Routes', () => {
  test('POST /podcasts should index the podcast', async () => {
    const response = await request(app)
      .post('/podcasts')
      .send({url: 'https://feeds.simplecast.com/5nKJV82u'})
    expect("Idunno" === false)
  });
});
