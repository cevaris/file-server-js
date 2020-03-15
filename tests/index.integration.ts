import fs from 'fs';
import http from 'http';
import request from 'supertest';
import { v4 } from 'uuid';

process.env.PORT = '3333'; // choose another port for integ tests
const server: http.Server = require('../index');

afterAll(() => {
    server.close();
});

describe('file-server', () => {
    it('is running', async () => {
        await request(server)
            .get('/')
            .then((resp) => {
                expect(resp.status).toBe(200);
                expect(resp.text).toBe('File Server\n')
            });
    });

    it('can fetch file', async () => {
        const resp = await request(server)
            .get('/files/clouds.jpg');

        expect(resp.status).toBe(200);

        const cloudsJpgByteLength = 149667;
        expect(resp.body instanceof Buffer).toBe(true);
        expect((resp.body as Buffer).length).toBe(cloudsJpgByteLength);
    });

    it('can upload a file', async () => {
        const uuid = v4();
        const filePath = `/tmp/test.txt`;
        await fs.promises.writeFile(filePath, uuid, 'UTF-8');

        const uploadResp = await request(server)
            .post('/files/upload.json')
            .attach('file', filePath)
            .set('Accept', 'application/json')

        expect(uploadResp.status).toBe(200);
        expect(uploadResp.body.status).toBe(true);

        const getResponse = await request(server)
            .get('/files/test.txt');

        expect(getResponse.status).toBe(200);
        expect(getResponse.text).toBe(uuid);
    });
});