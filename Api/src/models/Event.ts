import { DatabaseConnection } from "../database/DatabaseConnection";
import { IEvent } from "../models/interfaces/IEvent";
import { Schema } from "mongoose";

//var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DatabaseConnection.mongooseConnection;

class EventSchema extends Schema {

    static get schema() {

        let schema =  new Schema({
            name: {
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

let schema = mongooseConnection.model<IEvent>("Event", EventSchema.schema);
export = schema;