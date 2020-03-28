import { MongoClient, Db } from "mongodb"

export abstract class FilesClient {
    abstract all(): Promise<ServerFile[]>
    abstract save(file: ServerFile): Promise<void>
    abstract delete(fileName: string): Promise<void>
}

class MongoDBFilesClient implements FilesClient {
    private mongoDB: MongoClient;
    private filesServerDb: Db;

    constructor(mongoDB: MongoClient) {
        this.mongoDB = mongoDB;
        this.filesServerDb = mongoDB.db("fileServerDb");
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