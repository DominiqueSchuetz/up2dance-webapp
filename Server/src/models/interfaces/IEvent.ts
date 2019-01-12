import { Document } from "mongoose";

export interface IEvent extends Document {
    name: string;
    // address: object;
    // comment: string;
    // eventDate: Date;
    // timeStart: Date;
    // timeEnd: Date;
};