import { Document, Types } from "mongoose";


export interface IEvent extends Document {
    eventName: string;
    paSystem : boolean;
    address: object;
    comment: string;
    eventDate: Date;
    timeStart: Date;
    timeEnd: Date;
    salary : string;
    hidden: boolean;
    customerId: Types.ObjectId;
};