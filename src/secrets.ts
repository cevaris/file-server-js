class SecretsStore {
    MongoURI: string;

    constructor() {
        const baseURI = process.env.MONGODB_URI || 'mongodb://localhost';
        this.MongoURI = `${baseURI}/fileServerDb`;
    }
}

const Secrets = new SecretsStore();
export default Secrets;