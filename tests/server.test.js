const request = require('supertest');
const server = require('../server');

describe('GET /', () => {
  it('should return Router Active!', async () => {
    const res = await request(server).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Router Active!');
  });
});

describe('POST /upload', () => {
  it('should upload a file successfully', async () => {
    // Make a request to get a valid CSRF token first
    const csrfRes = await request(server).get('/csrf-token'); // Replace with the correct route to get a CSRF token
    const csrfToken = csrfRes.body.token; // Adjust this based on your response structure

    const res = await request(server)
      .post('/upload')
      .set('X-CSRF-Token', csrfToken) // Set the CSRF token in the header
      .attach('file', 'tests/test-file.txt');

    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('File uploaded successfully');
  });
});
