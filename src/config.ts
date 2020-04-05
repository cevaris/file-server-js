class ServerConfig {
    MongoURI: string;
    ServerPort: string;

    constructor() {
        this.MongoURI = process.env.MONGODB_URI || 'mongodb://localhost/fileServerDb';
        this.ServerPort = process.env.PORT || '3000';
    }
}

const Config = new ServerConfig();
export default Config;