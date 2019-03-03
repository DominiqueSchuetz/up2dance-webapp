import { Document } from "mongoose";

export interface IMedia extends Document {
    url: string;
    filePath: string;
};