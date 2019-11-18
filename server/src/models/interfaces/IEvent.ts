import { Document } from "mongoose";

export interface IEvent extends Document {
	eventName: string;
	eventType: string;
	paSystem: boolean;
	address: object;
	comment: string;
	eventDate: string;
	timeStart: string;
	timeEnd: string;
	entry: string;
	payment: string;
	hidden: boolean;
}
