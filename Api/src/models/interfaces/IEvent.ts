import { Document } from "mongoose";

export interface IEvent extends Document {
    eventName: string;
    address: object;
    comment: string;
    eventDate: Date;
    timeStart: Date;
    timeEnd: Date;
    hidden: boolean;
};