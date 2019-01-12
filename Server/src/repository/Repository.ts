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
    public list(callback: (error: any, result: any) => void): void {
        this._model.find((err, res) => {
            callback(err, res);
        });
    };

    /**
     * 
     * @param id 
     * @param callback 
     */
    public async getById(id: mongoose.Types.ObjectId, callback?: (error: any, result: any) => void): Promise<T> {
        try {
            const item = await this._model.findOne({ _id: id }, callback);
            if (item) {
                return item;
            }
        } catch (error) {
            callback(error, {});
        }
    };

    /**
     * 
     * @param email 
     * @param callback 
     */
    public async getByEmail(email: string, callback?: (error: any, result: any) => void): Promise<T> {
        try {
            const item = await this._model.findOne({ email: email }, callback);
            if (item) {
                return item;
            }
        } catch (error) {
            callback(error, {});
        }
    };

    /**
     * 
     * @param item 
     * @param callback 
     */
    public async create(item: T, callback: (error: any, result: any) => void): Promise<T> {
        try {
            const createdItem = await this._model.create(item, callback);
            if (createdItem) {
                return item;
            }
        } catch (error) {
            callback(error, {});
        }
    };

    /**
     * 
     * @param id 
     * @param item 
     * @param callback 
     */
    public async  update(id: mongoose.Types.ObjectId, item: T, callback: (error: any, result: any) => void): Promise<T> {
        try {
            const updatedItem = await this._model.updateOne({ _id: id }, item, callback);
            if (updatedItem) {
                return updatedItem;
            }
        } catch (error) {
            callback(error, {});
        }
    };

    /**
     * 
     * @param id 
     * @param callback 
     */
    public async delete(id: mongoose.Types.ObjectId, callback: (error: any, result: any) => void): Promise<T> {
        try {
            const item = await this._model.deleteOne({ _id: id });
            if (item) {
                return item;
            }
        } catch (error) {
            callback(error, {});
        }
    };
}

//export const repository = new Repository();