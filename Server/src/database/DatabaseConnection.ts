import { Connection } from "mongoose";
import * as mongoose from 'mongoose'

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
        this.mongooseConnection.once("open", () => {
            console.log('Connect to MongoDB ==> CustomerService');
        });

        this.mongooseInstance = mongoose.connect('mongodb://localhost:27017/up2dance', { useNewUrlParser: true });
        this.mongooseInstance = mongoose.set('useCreateIndex', true);
        
        return this.mongooseInstance;
    };
};

DatabaseConnection.connectToMongoDB();