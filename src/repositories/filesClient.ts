import { Collection } from "mongodb";
import { MongoDB } from "./mongodb";
import { ServerFile } from "../models/serverFile";

interface FilesClient {
    all(): Promise<ServerFile[]>
    save(file: ServerFile): Promise<void>
    delete(fileName: string): Promise<void>
}

class MongoDBFilesClient implements FilesClient {
    async all(): Promise<ServerFile[]> {
        const filesClient = await this.client();
        return filesClient.find({}).toArray();
    }

    async save(file: ServerFile): Promise<void> {
        const filesClient = await this.client();
        await filesClient.save(file);
    }

    async delete(fileName: string): Promise<void> {
        const filesClient = await this.client();
        await filesClient.remove({ name: fileName });
    }

    private async client(): Promise<Collection<ServerFile>> {
        const mongodb = await MongoDB.getInstance();
        const database = mongodb.db('fileServerDb');
        const collection = database.collection<ServerFile>('files');
        return collection;
    }
}

export const FilesClient: FilesClient = new MongoDBFilesClient();