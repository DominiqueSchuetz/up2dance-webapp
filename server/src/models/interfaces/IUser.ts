import { Document } from "mongoose";
import { IMedia } from "./IMedia";

export interface IUser extends Document {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	instrument: string;
	comment: string;
	refId?: string & IMedia;
}
