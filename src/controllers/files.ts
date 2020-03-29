import express from 'express';
import fileUpload from 'express-fileupload';
import fs from 'fs';
import { MongoDB } from '../clients/mongodb';

module.exports = (app: express.Express) => {
    app.use(express.static('public'));

    app.get('/files.json',  async (req: express.Request, res: express.Response) => {
        // const mongoDB = await MongoDB.getInstance();
        // const count = await mongoDB.collection('files').countDocuments();
        const count = await Promise.resolve(0);
        res.send(count.toString());
    });

    app.post('/files.json', (req: express.Request, res: express.Response) => {
        try {
            if (!req.files) {
                res.send({
                    status: false,
                    message: 'No file uploaded'
                });
            } else {

                // Use the name of the input field (i.e. "file") to retrieve the uploaded file
                // Check the req.files.file type, and only get the first file
                const file: fileUpload.UploadedFile = (req.files.constructor == Array) ?
                    (<fileUpload.UploadedFile[]>req.files.file)[0] :
                    (<fileUpload.UploadedFile>req.files.file);

                //Use the mv() method to place the file in upload directory (i.e. "uploads")
                file.mv('./public/files/' + file.name);

                // send response
                res.send({
                    status: true,
                    message: 'File is uploaded',
                    data: {
                        name: file.name,
                        mimetype: file.mimetype,
                        size: file.size
                    }
                });
            }
        } catch (err) {
            res.status(500).send(err);
        }
    });

    app.delete('/files/:fileName', async (req: express.Request, res: express.Response) => {
        try {
            const fileName = req.params.fileName;
            console.log(`deleting ${fileName}`);
            await fs.promises.unlink(`./public/files/${fileName}`);
            res.sendStatus(200);
        } catch (err) {
            res.status(500).send(err);
        }
    });
}

