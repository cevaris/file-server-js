import { Collection } from "mongodb";
import { MongoDB } from "./mongodb";
import { ServerFile } from "../models/serverFile";

export type FilesClient = {
    all(): Promise<ServerFile[]>
    save(file: ServerFile): Promise<void>
    delete(fileName: string): Promise<void>
}

class MongoDBFilesClient implements FilesClient {
    async all(): Promise<ServerFile[]> {
        // const filesClient = await this.client();
        // return filesClient.find().toArray();
        throw new Error("Method not implemented.");
    }

    async save(file: ServerFile): Promise<void> {
        const mongodb = MongoDB.getInstance();
        throw new Error("Method not implemented.");
    }

    async delete(fileName: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    // private async client(): Promise<Collection> {
    //     const mongodb = await MongoDB.getInstance();
    //     // const database = mongodb.db('fileServerDb');
    //     // const collection = database.collection('files');
    //     return collection;
    // }
}