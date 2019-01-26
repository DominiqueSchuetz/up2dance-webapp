import { DatabaseConnection } from "../database/DatabaseConnection";
import { INews } from "./interfaces/INews";
import { Schema } from "mongoose";
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');

//var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DatabaseConnection.mongooseConnection;

class NewsSchema extends Schema {

    static get schema() {

        let schema = new Schema({
            headline: {
                required: true,
                type: String,
                trim: true,
            },
            article: {
                required: true,
                type: String,
                trim: true,
            },
            author: {
                required: true,
                type: String,
                trim: true,
            },
            comment: {
                required: false,
                type: String,
                trim: true,
            },
            hidden: {
                type: Boolean,
                required: true,
                enum: [true, false],
                default: 'true',
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

let schema = mongooseConnection.model<INews>("News", NewsSchema.schema);
export = schema;