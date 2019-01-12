import * as mongoose from 'mongoose';


export interface IRead<T> {
    list: (callback: (error: any, result: any) => void) => void;
    getById: (id: mongoose.Types.ObjectId, callback: (error: any, result: any) => void) => void;
    getByEmail: (email: string, callback: (error: any, result: any) => void) => void;
};