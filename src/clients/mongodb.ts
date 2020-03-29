import { MongoClient } from "mongodb";
import Secrets from "../secrets";

export class MongoDB {
    static instance: MongoClient;

    static async getInstance(): Promise<MongoClient> {
        if(!MongoDB.instance){
            const MongoDBOptions = { useUnifiedTopology: true };
            MongoDB.instance = await MongoClient.connect(Secrets.MongoURI, MongoDBOptions);
        }
        return Promise.resolve(MongoDB.instance);
    }

    static async close(): Promise<void> {
        return MongoDB.instance.close();
    }
}