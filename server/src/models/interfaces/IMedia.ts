import { Document } from "mongoose";

export interface IMedia extends Document {
    fileUrl?: string;
    filePath?: string;
    fileName: string;
};
