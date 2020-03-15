import http from 'http';
import request from 'supertest';

process.env.PORT = '3333'; // choose another port for integ tests
const server: http.Server = require('../index');

afterAll(() => {
    server.close();
});

describe('file-server', () => {
    it('is running', async () => {
        return await request(server)
            .get('/')
            .then((resp) => {
                expect(resp.status).toBe(200);
                expect(resp.text).toBe('File Server\n')
            });
    });

    it('can fetch file', async () => {
        return await request(server)
            .get('/files/clouds.jpg')
            .then((resp) => {
                expect(resp.status).toBe(200);

                const cloudsJpgByteLength = 149667;
                expect(resp.body instanceof Buffer).toBe(true);
                expect((resp.body as Buffer).length).toBe(cloudsJpgByteLength);
            });
    });
});