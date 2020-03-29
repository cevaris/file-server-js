import mongoose from "mongoose";
import Secrets from "../secrets";

export class MongoDB {
    static instance: mongoose.Mongoose;

    static async getInstance(): Promise<mongoose.Mongoose> {
        if(!MongoDB.instance){
            try {
                const MongoDBOptions = { useUnifiedTopology: true };
                MongoDB.instance = await mongoose.connect(Secrets.MongoURI);
            } catch (err) {
                console.error(err);
            }
        }
        return Promise.resolve(MongoDB.instance);
    }

    static async close(): Promise<void> {
        if(MongoDB.instance){
            return MongoDB.instance.connection.close();
        } else {
            return Promise.resolve();
        }
    }
}