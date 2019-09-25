import { Document } from "mongoose";

export interface IEvent extends Document {
	eventName: string;
	eventType: string;
	paSystem: boolean;
	address: object;
	commentEvent: string;
	eventDate: Date | string;
	timeStart: Date | string;
	timeEnd: Date | string;
	payment: string;
	hidden: boolean;
}
