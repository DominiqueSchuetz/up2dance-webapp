import { DatabaseConnection } from "../database/DatabaseConnection";
import { IUser } from "./interfaces/IUser";
import { Schema } from "mongoose";
import * as MediaSchema from '../models/Media';
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');

//var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DatabaseConnection.mongooseConnection;

class UserSchema extends Schema {

    static get schema() {

        let schema = new Schema({
            firstName: {
                required: true,
                lowercase: true,
                type: String,
                trim: true,
            },
            lastName: {
                required: true,
                lowercase: true,
                type: String,
                trim: true,
            },
            email: {
                required: true,
                lowercase: true,
                match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
                maxlength: 30,
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
            },
            comment: {
                type: String,
                required: false,
                trim: true
            },
            media: {
                required: false,
                type: Schema.Types.Mixed,
                ref: MediaSchema
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

let schema = mongooseConnection.model<IUser>("User", UserSchema.schema);
export = schema;