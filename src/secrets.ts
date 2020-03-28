//TODO: convert this to a promise
class SecretsStore {
    MongoURI: string;

    constructor() {
        this.MongoURI = process.env.MONGODB_URI || 'mongodb://localhost';
    }
}

const Secrets = new SecretsStore();
export default Secrets;