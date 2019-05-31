import { Document } from "mongoose";

export interface INews extends Document {
    headline: string;
    article: string;
    author: string;
    comment: string;
    hidden: boolean;
    refId?: string;
};