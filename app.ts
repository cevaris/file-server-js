import bodyParser from 'body-parser';
import dotEnv from 'dotenv-flow';
import express from 'express';
import fileUpload from 'express-fileupload';

// read in environment variables from .env* files
dotEnv.config();

export const app: express.Express = express();

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