import { DatabaseConnection } from "../database/DatabaseConnection";
import { ICustomer } from "./interfaces/ICustomer";
import { Schema } from "mongoose";

import * as EventSchema from '../models/Event';
import * as  mongoose from 'mongoose';

const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');

//var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DatabaseConnection.mongooseConnection;

class CustomerSchema extends Schema {

    static get schema() {

        let schema = new Schema({
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
            companyName: {
                required: false,
                type: String,
                trim: true,
            },
            phone: {
                required: true,
                type: String,
                trim: true,
            },
            mail: {
                required: false,
                type: String,
                trim: true,
            },
            event: {
                required: false,
                type: mongoose.Schema.Types.Mixed,
                ref: EventSchema
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

let schema = mongooseConnection.model<ICustomer>("Customer", CustomerSchema.schema);
export = schema;