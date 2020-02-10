import { DatabaseConnection } from "../database/DatabaseConnection";
import { IUser } from "./interfaces/IUser";
import { Schema } from "mongoose";
import * as MediaSchema from "../models/Media";
const mongooseStringQuery = require("mongoose-string-query");
const timestamps = require("mongoose-timestamp");

//var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DatabaseConnection.mongooseConnection;

class UserSchema extends Schema {
	static get schema() {
		let schema = new Schema(
			{
				firstName: {
					required: true,
					lowercase: true,
					type: String,
					trim: true,
					minlength: 2
				},
				lastName: {
					required: true,
					lowercase: true,
					type: String,
					trim: true,
					minlength: 2
				},
				email: {
					required: true,
					lowercase: true,
					match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ],
					minlength: 5,
					maxlength: 30,
					unique: true,
					type: String,
					trim: true
				},
				password: {
					required: true,
					type: String,
					trim: true,
					minlength: 5
				},
				instrument: {
					type: String,
					required: true,
					enum: [
						"Gesang",
						"Gesang/Gitarre",
						"Keyboard/Synths",
						"Gitarre(Lead)",
						"Gitarre(Solo)",
						"Bass",
						"Schlagzeug",
						"Musiker"
					],
					default: "Musiker"
				},
				comment: {
					type: String,
					required: false,
					trim: true
				},
				refId: {
					type: Schema.Types.ObjectId,
					ref: MediaSchema,
					required: false
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

let schema = mongooseConnection.model<IUser>("User", UserSchema.schema);
export = schema;
