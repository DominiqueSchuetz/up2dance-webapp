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

    public async list(): Promise<T[]> {
        try {
            const items: T[] = await this._model.find().exec();
            if (items) {
                return items;
            }
        } catch (error) {
            return error;
        }
    };

    /**
     * 
     * @param id 
     * @param callback 
     */
    public async getById(id: mongoose.Types.ObjectId, callback?: (error: any, result: T) => void): Promise<T> {
        try {
            const item: T = await this._model.findOne({ _id: id }).exec();
            if (item) {
                return item;
            }
        } catch (error) {
            return error;
        }
    };

    /**
     * 
     * @param email 
     * @param callback 
     */
    public async getByEmail(email: string, callback?: (error: any, result: T) => void): Promise<T> {
        try {
            const item: T = await this._model.findOne({ email: email }).exec();
            if (item) {
                return item;
            }
        } catch (error) {
            return error;
        }
    };

    /**
     * 
     * @param item 
     * @param callback 
     */
    public async create(item: T): Promise<T> {
        try {
            const createdItem: T = await this._model.create(item)
            if (createdItem) {
                return createdItem
            }
        } catch (error) {
            return error;
        }
    };

    /**
     * 
     * @param id 
     * @param item 
     * @param callback 
     */
    public async  update(id: mongoose.Types.ObjectId, item: T, callback?: (error: any, result: any) => void): Promise<T> {
        try {
            const updatedItem: T = await this._model.updateOne({ _id: id }, item).exec();
            if (updatedItem) {
                return updatedItem;
            }
        } catch (error) {
            return error;
        }
    };

    /**
     * 
     * @param id 
     * @param callback 
     */
    public async delete(id: mongoose.Types.ObjectId, callback?: (error: any, result: T) => void): Promise<T> {
        try {
            const deletedItem: T = await this._model.deleteOne({ _id: id }).exec();
            if (deletedItem) {
                return deletedItem;
            }
        } catch (error) {
            return error;
        }
    };
}

//export const repository = new Repository();
