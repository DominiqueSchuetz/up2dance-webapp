import { Connection } from "mongoose";
import * as mongoose from 'mongoose'
import * as config from '../../config';

export class DatabaseConnection {


    // 'mongoDbOptions': {
    //     'useNewUrlParser': true,
    //     'autoIndex': false, // Don't build indexes
    //     'reconnectTries': Number.MAX_VALUE, // Never stop trying to reconnect
    //     'reconnectInterval': 500, // Reconnect every 500ms
    //     'poolSize': 10, // Maintain up to 10 socket connections
    //     // If not connected, return errors immediately rather than waiting for reconnect
    //     'bufferMaxEntries': 0,
    //     'connectTimeoutMS': 10000, // Give up initial connection after 10 seconds
    //     'socketTimeoutMS': 45000, // Close sockets after 45 seconds of inactivity
    //     'family': 4 // Use IPv4, skip trying IPv6
    // },
    // 'dbHost': 'mongodb://localhost:27017/my-mongoDB'

    static mongooseInstance: Connection | any;
    static mongooseConnection: Connection;

    constructor() {
        DatabaseConnection.connectToMongoDB();
    };

    public static connectToMongoDB(): Connection {

        if (this.mongooseInstance) return this.mongooseInstance;

        this.mongooseConnection = mongoose.connection;
        
        this.mongooseConnection.on('error', (err) => {
            console.error(err);
            process.exit(1);
        });

        this.mongooseConnection.once("open", () => {
            console.log('\x1b[33m%s\x1b[0m', 'Connect to MongoDB');
        });

        this.mongooseInstance = mongoose.connect(config.db.uri, { useNewUrlParser: true });
        this.mongooseInstance = mongoose.set('useCreateIndex', true);

        return this.mongooseInstance;
    };
};

DatabaseConnection.connectToMongoDB();