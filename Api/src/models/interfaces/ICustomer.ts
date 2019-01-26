import { Document } from "mongoose";
import { IEvent } from "./IEvent";

export interface ICustomer extends Document {
    firstName: string;
    lastName: string;
    mobil: string;
    mail: string;
    //event: object;
};