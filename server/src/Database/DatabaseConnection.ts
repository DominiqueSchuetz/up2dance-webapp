import { Connection } from "mongoose";
import mongoose = require('mongoose');
import * as config from '../../config';

export class DatabaseConnection {

    static mongooseInstance: Connection | any;
    static mongooseConnection: Connection;

    constructor() {
        DatabaseConnection.connectToMongoDB();
    };

    public static async connectToMongoDB(): Promise<Connection> {
        mongoose.Promise = Promise;

        try {
            if (this.mongooseInstance) return this.mongooseInstance;
            this.mongooseConnection = mongoose.connection;

            const mongooseConnect = await mongoose.connect(config.default.mongoDB.dbHost, {
                useCreateIndex: true,
                useNewUrlParser: true,
                useFindAndModify: false
            });
            if (mongooseConnect) {
                this.mongooseInstance = mongooseConnect;
                console.log('\x1b[33m%s\x1b[0m', 'Connect to MongoDB ==> ', mongooseConnect.modelNames());
                return this.mongooseInstance;
            }
        } catch (error) {
            console.log('\x1b[31m', ' :( Could not connect to database. Right Port? ', error.message);
        }
    };
};

DatabaseConnection.connectToMongoDB();
