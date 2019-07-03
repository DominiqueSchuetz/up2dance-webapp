import { Model, Document, Types } from "mongoose";
import { IWrite } from './interfaces/IWrite';
import { IRead } from './interfaces/IRead';

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
    public async getById(id: Types.ObjectId, callback?: (error: any, result: T) => void): Promise<T> {
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
     * @param id 
     * @param callback 
     */
    public async getByIdAndRefId(id: Types.ObjectId, callback?: (error: any, result: T) => void): Promise<T> {
        try {
            const item: T = await this._model.findOne({ _id: id }).populate('refId').exec();
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
    public async createWithCallback(item, mongooseModel?: Model<Document>, callback?: (error: any, result) => any): Promise<any> {
        try {
            const createdItem = await mongooseModel.create(item);
            if (createdItem) {
                return callback(null, createdItem)
            } else {
                return callback('Could not createWithCallback()', null);
            }
        } catch (error) {
            return callback(error, null);
        }
    };

    /**
     * 
     * @param id 
     * @param item 
     * @param callback 
     */
    public async update(id: Types.ObjectId, item: T, callback?: (error: any, result: any) => void): Promise<T> {
        try {
            const updatedItem: T = await this._model.findOneAndUpdate({ _id: id }, { $set: item }, { new: true }).exec();
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
     * @param item 
     * @param callback 
     */
    public async replace(id: Types.ObjectId, item: T, callback?: (error: any, result: any) => void): Promise<T> {
        try {
            const replaceedItem: T = await this._model.replaceOne({ _id: id }, item).exec();
            if (replaceedItem) {
                return replaceedItem;
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
    public async delete(id: Types.ObjectId, callback?: (error: any, result: T) => void): Promise<{ ok?: number; n?: number }> {
        try {
            const deletedItem = await this._model.deleteOne({ _id: id }).exec();
            if (deletedItem) {
                return deletedItem;
            }
        } catch (error) {
            return error;
        }
    };
};
