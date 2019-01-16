import { Model, Document } from "mongoose";
import { IWrite } from './interfaces/IWrite';
import { IRead } from './interfaces/IRead';

import * as mongoose from 'mongoose';

export class Repository<T extends Document> implements IWrite<T>, IRead<T> {

    private _model: Model<any>;

    /**
     * 
     * @param schemaModel 
     */
    constructor(schemaModel: Model<Document>) {
        this._model = schemaModel;
    };

    /**
     * List all Customers in Database
     */
    // public list(): Promise<T[]> {
    //     return new Promise((resolve, reject) => {
    //         this._model.find((err, res) => {
    //             if (!err && res) {
    //                 resolve(res);
    //             } else {
    //                 reject(err);
    //             };
    //         });
    //     });
    // };

    public async list(callback?: (error: any, result: T[]) => void): Promise<void> {
        try {
            const items: T[] = await this._model.find().exec();
            if (items && Array.isArray(items)) {
                callback(null, items);
            } else {
                callback(items, null);
            }
        } catch (error) {
            callback(error, null);
        }
    };

    /**
     * 
     * @param id 
     * @param callback 
     */
    public async getById(id: mongoose.Types.ObjectId, callback?: (error: any, result: T) => void): Promise<void> {
        try {
            const item: T = await this._model.findOne({ _id: id }).exec();
            if (item) {
                callback(null, item);
            } else {
                callback(item, null);
            }
        } catch (error) {
            callback(error, null);
        }
    };

    /**
     * 
     * @param email 
     * @param callback 
     */
    public async getByEmail(email: string, callback?: (error: any, result: T) => void): Promise<void> {
        try {
            const item: T = await this._model.findOne({ email: email }).exec();
            if (item) {
                callback(null, item);
            } else {
                callback(item, null);
            }
        } catch (error) {
            callback(error, null);
        }
    };

    /**
     * 
     * @param item 
     * @param callback 
     */
    public async create(item: T, callback: (error: any, result: T) => void): Promise<void> {
        try {
            const createdItem: T = await this._model.create(item)
            if (createdItem) {
                callback(null, createdItem);
            } else {
                callback(createdItem, null);
            }
        } catch (error) {
            callback(error, null);
        }
    };

    /**
     * 
     * @param id 
     * @param item 
     * @param callback 
     */
    public async  update(id: mongoose.Types.ObjectId, item: T, callback: (error: any, result: any) => void): Promise<void> {
        try {
            const updatedItem: T = await this._model.updateOne({ _id: id }, item).exec();
            if (updatedItem) {
                callback(null, updatedItem);
            } else {
                callback(updatedItem, null);
            }
        } catch (error) {
            callback(error, null);
        }
    };

    /**
     * 
     * @param id 
     * @param callback 
     */
    public async delete(id: mongoose.Types.ObjectId, callback: (error: any, result: T) => void): Promise<void> {
        try {
            const deletedItem: T = await this._model.deleteOne({ _id: id }).exec();
            if (deletedItem) {
                callback(null, deletedItem);
            } else {
                callback(deletedItem, null);
            }
        } catch (error) {
            callback(error, null);
        }
    };
}

//export const repository = new Repository();
