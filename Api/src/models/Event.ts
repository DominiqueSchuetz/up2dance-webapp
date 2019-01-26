import { DatabaseConnection } from "../database/DatabaseConnection";
import { IEvent } from "./interfaces/IEvent";
import { Schema } from "mongoose";
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');

//var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DatabaseConnection.mongooseConnection;

class EventSchema extends Schema {

    static get schema() {

        let schema = new Schema({
            eventName: {
                required: true,
                type: String,
                trim: true,
            },
            address: {
                street: {
                    type: String,
                    required: false,
                    trim: true,
                },
                streetNumber: {
                    type: String,
                    required: false,
                    trim: true,
                },
                city: {
                    type: String,
                    required: false,
                    trim: true,
                },
                zipcode: {
                    type: String,
                    required: false,
                    trim: true,
                },
                geo: {
                    lat: {
                        type: Number,
                        required: false,
                        trim: true,
                    },
                    lng: {
                        type: Number,
                        required: false,
                        trim: true,
                    }
                }
            },
            comment: {
                type: String,
                required: false,
                trim: true,
            },
            eventDate: {
                type: Date,
                required: false,
            },
            timeStart: {
                type: Date,
                required: false,
                trim: true,
            },
            timeEnd: {
                type: Date,
                required: false,
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

let schema = mongooseConnection.model<IEvent>("Event", EventSchema.schema);
export = schema;