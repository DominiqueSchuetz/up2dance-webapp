import { Document } from "mongoose";

export interface ICustomer extends Document {
    firstName: string;
    lastName: string;
    companyName: string,
    phone: string;
    mail: string;
    comment: string;
    refId?: string;
};