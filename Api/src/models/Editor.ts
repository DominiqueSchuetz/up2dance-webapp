import { DatabaseConnection } from "../database/DatabaseConnection";
import { IEditor } from "./interfaces/IEditor";
import { Schema } from "mongoose";
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');

//var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DatabaseConnection.mongooseConnection;

class EditorSchema extends Schema {

    static get schema() {

        let schema =  new Schema({
            firstName: {
                required: true,
                type: String,
                trim: true,
            },
            lastName: {
                required: true,
                type: String,
                trim: true,
            },
            email: {
                required: true,
                unique: true,
                type: String,
                trim: true,
            },
            password: {
                required: true,
                type: String,
                trim: true,
            },
            instrument: {
                type: String,
                required: true,
                enum: ['drums', 'keys', 'bass', 'singer', 'guitar', 'musician'],
                default: 'musician',
            }
        }, 
        { minimize: false },
        );

        schema.plugin(mongooseStringQuery);
        // ISO-8601
        schema.plugin(timestamps);
        return schema;
    };
};

let schema = mongooseConnection.model<IEditor>("Editor", EditorSchema.schema);
export = schema;