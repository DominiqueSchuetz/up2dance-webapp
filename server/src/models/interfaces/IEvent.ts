import { Document } from "mongoose";

export interface IEvent extends Document {
	eventName: string;
	eventType: string;
	paSystem: boolean;
	address: object;
	comment: string;
	eventDate: Date | string;
	timeStart: Date | string;
	timeEnd: Date | string;
	admissionCharge: string;
	payment: string;
	hidden: boolean;
}
