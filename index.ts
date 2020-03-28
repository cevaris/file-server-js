import bodyParser from 'body-parser';
import dotEnv from 'dotenv-flow';
import express from 'express';
import fileUpload from 'express-fileupload';
import http from 'http';
import { MongoClient } from 'mongodb';
import { FilesClient, FilesClientBuilder } from './src/clients/filesClient';
import Secrets from './src/secrets';

console.log('server starting...');

dotEnv.config();

const app: express.Express = express();

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({
    createParentPath: true,
    limits: {
        fileSize: 2 * 1024 * 1024 * 1024 //2MB max file(s) size
    },
}));

// Import routes defined elsewhere
require('./src/controllers/root')(app);
require('./src/controllers/files')(app);

const PORT = process.env.PORT || '3000';
export const server: http.Server = app.listen(PORT, async () => {
    // const mongodbOptions = { useUnifiedTopology: true };
    // mongoClient = await MongoClient.connect(Secrets.MongoURI, mongodbOptions);
    // filesClient = FilesClientBuilder.getInstance(mongoClient);
    console.log(`Example app listening on port ${PORT}!`);
    console.log('server started.');
});

export var filesClient: FilesClient;
let mongoClient: MongoClient;
(async () => {
    const mongodbOptions = { useUnifiedTopology: true };
    mongoClient = await MongoClient.connect(Secrets.MongoURI, mongodbOptions);
    filesClient = FilesClientBuilder.getInstance(mongoClient);
})().catch(console.error);
