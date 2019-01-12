import { DatabaseConnection } from "../database/DatabaseConnection";
import { ICustomer } from "./interfaces/ICustomer";
import { Schema } from "mongoose";

//var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DatabaseConnection.mongooseConnection;

class CustomerSchema extends Schema {

    static get schema() {

        let schema =  new Schema({
            firstName: {
                required: true,
                type: String,
            },
            lastName: {
                required: true,
                type: String,
            },
            email: {
                required: true,
                unique: true,
                type: String,
            },
            password: {
                required: true,
                type: String,
            },
            createdDate: {
                type: Date,
                default: Date.now()
            }
        })
        return schema;
    };
};

let schema = mongooseConnection.model<ICustomer>("Customer", CustomerSchema.schema);
export = schema;