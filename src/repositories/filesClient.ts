import { Collection, IndexOptions, UpdateOneOptions } from "mongodb";
import { FileMetadata } from "../models/serverFile";
import { MongoDB } from "./mongodb";

interface FileMetadataRepository {
    all(): Promise<FileMetadata[]>
    insert(file: FileMetadata): Promise<void>
    update(file: FileMetadata): Promise<void>
    delete(fileName: string): Promise<void>
}

class FileMetadataRepositoryMongoDB implements FileMetadataRepository {
    async all(): Promise<FileMetadata[]> {
        const filesClient = await this.client();
        // disable from returning ObjectId
        const opts = { projection: { _id: 0 } };
        return filesClient.find({}, opts).toArray();
    }

    async insert(file: FileMetadata): Promise<void> {
        const filesClient = await this.client();
        await filesClient.insertOne(file);
    }

    async update(file: FileMetadata): Promise<void> {
        const filesClient = await this.client();
        const query = { name: file.name };
        const data = { $set: file };
        const params: UpdateOneOptions = { upsert: true }
        await filesClient.updateOne(query, data, params);
    }

    async delete(fileName: string): Promise<void> {
        const filesClient = await this.client();
        const query = { name: fileName };
        await filesClient.deleteOne(query);
    }

    private async client(): Promise<Collection<FileMetadata>> {
        const mongodb = await MongoDB.getInstance();
        const database = mongodb.db();
        const collection = database.collection<FileMetadata>('files');

        // create "name" index to prevent files name conflicts
        // const indexOpts: IndexOptions = { unique: true, background: true };
        // await collection.createIndex("name", indexOpts);

        return collection;
    }
}

export const FileMetadataRepository: FileMetadataRepository = new FileMetadataRepositoryMongoDB();