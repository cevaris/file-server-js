import { MongoDB } from '../src/repositories/mongodb';
import { v4 } from 'uuid';
import fs from 'fs';
import http from 'http';
import request from 'supertest';
import { app } from '../app';

let server: http.Server;

beforeAll((done) => {
    // server does not get shutdown properly
    // https://github.com/facebook/jest/issues/6907
    server = app.listen(done);
})

beforeEach(async () => {
    // clear out all existing data before running a new test
    await MongoDB.deleteAll('fileServerDb', 'files');
})

afterAll(async (done) => {
    // after all test are executed, shutdown server
    await MongoDB.close();
    server.close(done);
});

describe('file-server', () => {
    it('is running', async () => {
        const resp = await request(server)
            .get('/');

        expect(resp.status).toBe(200);
        expect(resp.text).toBe('File Server\n')
    });

    it('can upload a file', async () => {
        // use a new UUID for every test run
        const uuid = v4();

        // create a local tmp file to upload
        const filePath = `/tmp/test.txt`;
        await fs.promises.writeFile(filePath, uuid);

        // upload tmp file via File ServerAPI
        const uploadResp = await request(server)
            .post('/files.json')
            .attach('file', filePath);
        expect(uploadResp.status).toBe(200);
        expect(uploadResp.body.status).toBe(true);

        // fetch file to confirm successful upload
        const getResponse = await request(server)
            .get('/files/test.txt');
        expect(getResponse.status).toBe(200);
        expect(getResponse.text).toBe(uuid);

        // assert file metadata is saved
        const filesResponse = await request(server)
            .get('/files.json');
        expect(filesResponse.status).toBe(200);
        expect(filesResponse.body).toStrictEqual({
            files: [{
                file_name: 'test.txt',
                mime_type: 'text/plain',
                size_bytes: 36
            }]
        });

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

        const filesResponse = await request(server)
            .get('/files.json');
        expect(filesResponse.status).toBe(200);
        expect(filesResponse.body).toStrictEqual({
            files: [{
                file_name: 'test2.txt',
                mime_type: 'text/plain',
                size_bytes: 36
            }]
        });        

        const deleteResponse = await request(server)
            .delete('/files/test2.txt');
        expect(deleteResponse.status).toBe(200);

        const exists = await fs.existsSync('public/files/test2.txt');
        expect(exists).toBe(false);

        const filesResponseAfter = await request(server)
            .get('/files.json');
        expect(filesResponseAfter.status).toBe(200);
        expect(filesResponseAfter.body).toStrictEqual({files: []});
    });
});