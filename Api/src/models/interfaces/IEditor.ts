import { Document } from "mongoose";

export interface IEditor extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    instrument: string;
};