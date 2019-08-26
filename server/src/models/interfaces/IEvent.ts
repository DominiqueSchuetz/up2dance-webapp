import { Document } from "mongoose";

export interface IEvent extends Document {
	eventName: string;
	eventType: string;
	paSystem: boolean;
	address: object;
	commentEvent: string;
	eventDate: Date;
	timeStart: Date;
	timeEnd: Date;
	payment: string;
	hidden: boolean;
}
