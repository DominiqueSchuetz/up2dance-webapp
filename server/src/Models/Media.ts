import { DatabaseConnection } from "../database/DatabaseConnection";
import { IMedia } from "./interfaces/IMedia";
import { Schema } from "mongoose";
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');

//var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DatabaseConnection.mongooseConnection;

class MediaSchema extends Schema {

    static get schema() {

        let schema = new Schema({
            fileName: {
                required: true,
                type: String,
                trim: true,
            },
            filePath: {
                required: false,
                type: String,
                trim: true,
            },
            fileUrl: {
                required: false,
                type: String,
                trim: true,
            },

        },
            { minimize: false },
        );

        schema.plugin(mongooseStringQuery);
        // ISO-8601
        schema.plugin(timestamps);
        return schema;
    };
};

let schema = mongooseConnection.model<IMedia>("Media", MediaSchema.schema);
export = schema;
