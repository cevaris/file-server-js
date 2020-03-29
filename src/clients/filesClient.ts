import { ServerFile } from "../models/serverFile";
import mongoose, { Schema, Document } from 'mongoose';

const ServerFileMongoSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    mimeType: { type: String, required: false, unique: true },
    size: { type: Number, required: true, unique: false },
});

const ServerFileMongoDB = mongoose.model<ServerFile & Document>(
    'ServerFile', ServerFileMongoSchema
);

export interface FilesClient {
    all(): Promise<ServerFile[]>
    // // save(file: ServerFile): Promise<void>
    // delete(fileName: string): Promise<void>
}

class MongoDBFilesClient implements FilesClient {
    async all(): Promise<ServerFile[]> {
        return await ServerFileMongoDB.find().map(results => results);
        // const filesClient = await this.client();
        // return filesClient.find().toArray();
        // throw new Error("Method not implemented.");
    }

    // async save(file: ServerFile): Promise<void> {
    //     const mongodb = MongoDB.getInstance();
    //     throw new Error("Method not implemented.");
    // }

    // async delete(fileName: string): Promise<void> {
    //     throw new Error("Method not implemented.");
    // }

    // private async client() {
    //     const mongodb = await MongoDB.getInstance();
    //     // const database = mongodb.db('fileServerDb');
    //     // const collection = database.collection('files');
    //     return collection;
    // }
}