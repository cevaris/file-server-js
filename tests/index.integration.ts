// choose a custom port to run integ tests on
process.env.PORT = '3333';

import fs from 'fs';
import request from 'supertest';
import { v4 } from 'uuid';
import server from '../index';


// after all test are executed, shutdown server
afterAll(() => {
    server.close();
});

describe('file-server', () => {
    it('is running', async () => {
        const resp = await request(server)
            .get('/');

        expect(resp.status).toBe(200);
        expect(resp.text).toBe('File Server\n')
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
        // use a new UUID for every test run
        const uuid = v4();

        const filePath = `/tmp/test.txt`;
        await fs.promises.writeFile(filePath, uuid);

        const uploadResp = await request(server)
            .post('/files.json')
            .attach('file', filePath);
        expect(uploadResp.status).toBe(200);
        expect(uploadResp.body.status).toBe(true);

        const getResponse = await request(server)
            .get('/files/test.txt');
        expect(getResponse.status).toBe(200);
        expect(getResponse.text).toBe(uuid);
    });

    it('can delete a file', async () => {
        // use a new UUID for every test run
        const uuid = v4();

        const filePath = `/tmp/test2.txt`;
        await fs.promises.writeFile(filePath, uuid);

        const uploadResp = await request(server)
            .post('/files.json')
            .attach('file', filePath);
        expect(uploadResp.status).toBe(200);
        expect(uploadResp.body.status).toBe(true);

        const deleteResponse = await request(server)
            .delete('/files/test2.txt');
        expect(deleteResponse.status).toBe(200);

        const exists = await fs.existsSync('public/files/test2.txt');
        expect(exists).toBe(false);
    });
});