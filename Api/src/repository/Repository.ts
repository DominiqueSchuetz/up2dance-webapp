import { Model, Document, Query } from "mongoose";
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
    public async searchForItem(email: string): Promise<T> {
        try {
            const item: T = await this._model.findOne({ email }).exec();
            if (item) {
                return item;
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
    public async getByEmail(mail: string, callback?: (error: any, result: T) => void): Promise<T> {
        try {
            const item: T = await this._model.findOne({ mail }).exec();
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
     * @param item 
     * @param mongooseModel 
     * @param callback 
     */
    public async createWithCallback(item, mongooseModel?: Model<any>, callback?: (error: any, result) => any): Promise<any> {
        try {
            const createdItem = await mongooseModel.create(item);
            if (createdItem) {
                return callback(null, createdItem)
            } else {
                return callback('error', null);
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
    public async update(id: mongoose.Types.ObjectId, item: T, callback?: (error: any, result: any) => void): Promise<T> {
        try {
            const updatedItem: T = await this._model.findOneAndUpdate({ _id: id }, item, { new: true }).exec();
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
    public async delete(id: mongoose.Types.ObjectId, callback?: (error: any, result: T) => void): Promise<{ok?: number; n?:number}> {
        try {
            const deletedItem = await this._model.deleteOne({ _id: id }).exec();
            if (deletedItem) {
                return deletedItem;
            }
        } catch (error) {
            return error;
        }
    };
}

//export const repository = new Repository();
