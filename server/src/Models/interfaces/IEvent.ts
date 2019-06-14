import { Document } from "mongoose";

export interface IEvent extends Document {
    eventName: string;
    eventType: string;
    paSystem : boolean;
    address: object;
    comment: string;
    eventDate: Date;
    timeStart: Date;
    timeEnd: Date;
    payment : string;
    hidden: boolean;
};
