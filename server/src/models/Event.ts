import { DatabaseConnection } from "../database/DatabaseConnection";
import { IEvent } from "./interfaces/IEvent";
import { Schema } from "mongoose";
const mongooseStringQuery = require("mongoose-string-query");
const timestamps = require("mongoose-timestamp");

//var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DatabaseConnection.mongooseConnection;

class EventSchema extends Schema {
	static get schema() {
		let schema = new Schema(
			{
				eventName: {
					required: true,
					type: String,
					trim: true
				},
				eventType: {
					type: String,
					required: true,
					enum: [ "Öffentliche Versanstaltung", "Geschlossene Veranstaltung" ],
					default: "Öffentliche Versanstaltung"
				},
				paSystem: {
					required: false,
					type: Boolean
				},
				payment: {
					required: false,
					type: String,
					trim: true
				},
				admissionCharge: {
					required: false,
					type: String,
					trim: true
				},
				address: {
					streetName: {
						type: String,
						required: false,
						trim: true
					},
					streetNumber: {
						type: String,
						required: false,
						trim: true
					},
					city: {
						type: String,
						required: false,
						trim: true
					},
					zipcode: {
						type: String,
						required: false,
						trim: true
					},
					location: {
						type: {
							type: String, // Don't do `{ location: { type: String } }`
							enum: [ "Point" ], // 'location.type' must be 'Point'
							required: false
						},
						coordinates: {
							type: [ Number ],
							required: false
						}
					}
				},
				comment: {
					type: String,
					required: false,
					trim: true
				},
				eventDate: {
					type: Date || String,
					required: true
				},
				timeStart: {
					type: Date || String,
					required: false,
					trim: true
				},
				timeEnd: {
					type: Date || String,
					required: false,
					trim: true
				},
				hidden: {
					type: Boolean,
					required: true,
					enum: [ true, false ],
					default: "true"
				}
			},
			{ minimize: false }
		);

		schema.plugin(mongooseStringQuery);
		// ISO-8601
		schema.plugin(timestamps);
		return schema;
	}
}

let schema = mongooseConnection.model<IEvent>("Event", EventSchema.schema);
export = schema;
