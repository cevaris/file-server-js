import { MongoClient, Db } from "mongodb"

export abstract class FilesClient implements Closable {
    abstract close(): Promise<void>
    abstract all(): Promise<ServerFile[]>
    abstract save(file: ServerFile): Promise<void>
    abstract delete(fileName: string): Promise<void>
}

export type Closable = {
    close(): Promise<void>;
}

export class FilesClientBuilder {
    private static instance: FilesClient;

    static getInstance(mongoDB: MongoClient): FilesClient {
        if (!FilesClientBuilder.instance) {
            FilesClientBuilder.instance = new MongoDBFilesClient(mongoDB);
        }
        return FilesClientBuilder.instance;
    }
}

class MongoDBFilesClient implements FilesClient {
    private mongoDB: MongoClient;
    private filesServerDb: Db;

    constructor(mongoDB: MongoClient) {
        this.mongoDB = mongoDB;
        this.filesServerDb = mongoDB.db("fileServerDb");
    }

    close(): Promise<void> {
        return this.mongoDB.close();
    }
    all(): Promise<ServerFile[]> {

        throw new Error("Method not implemented.");
    }
    save(file: ServerFile): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(fileName: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}