import express from 'express';
import fileUpload from 'express-fileupload';
import fs from 'fs';
import { FileMetadataRepository } from '../repositories/filesClient';
import { FileMetadata } from '../models/serverFile';
import { MongoError } from 'mongodb';

module.exports = (app: express.Express) => {
    app.use(express.static('public'));

    app.get('/files.json', async (req: express.Request, res: express.Response) => {
        const files = await FileMetadataRepository.all();
        const filesJson = files.map(f => {
            return {
                file_name: f.name,
                mime_type: f.mimeType,
                size_bytes: f.size
            }
        })

        res.send({ files: filesJson });
    });

    app.post('/files.json', async (req: express.Request, res: express.Response) => {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
            return;
        }

        // Use the name of the input field (i.e. "file") to retrieve the uploaded file
        // Check the req.files.file type, and only get the first file
        const file: fileUpload.UploadedFile = (req.files.constructor == Array) ?
            (<fileUpload.UploadedFile[]>req.files.file)[0] :
            (<fileUpload.UploadedFile>req.files.file);

        const fileMetaData: FileMetadata = {
            name: file.name,
            mimeType: file.mimetype,
            size: file.size
        }

        try {
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            file.mv('./public/files/' + file.name);

            const insert = await FileMetadataRepository.insert(fileMetaData);

            // send response
            res.send({
                status: true,
                message: 'File is uploaded'
            });
        } catch (err) {
            if (err instanceof MongoError) {
                return res.status(500).send({
                    status: false,
                    message: err.message
                });
            }

            res.status(500).send({
                status: false,
                message: err.message
            });
        }
    });

    app.delete('/files/:fileName', async (req: express.Request, res: express.Response) => {
        try {
            const fileName = req.params.fileName;
            await fs.promises.unlink(`./public/files/${fileName}`);
            await FileMetadataRepository.delete(fileName);
            res.sendStatus(200);
        } catch (err) {
            res.status(500).send(err);
        }
    });
}

